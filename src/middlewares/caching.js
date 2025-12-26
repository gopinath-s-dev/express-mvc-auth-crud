import lruCache from "../config/lruCache.js";
import redisCache from "../config/redis.js";

const cache = (keyBuilder, ttl = 1000 * 60 * 5) => {
  return async (req, res, nxt) => {
    const key = typeof keyBuilder === "function" ? keyBuilder(req) : keyBuilder;

    const lruCachedData = lruCache.get(key);
    if (lruCachedData) return res.json(JSON.parse(lruCachedData));

    const redisCachedData = await redisCache.get(key);
    if (redisCachedData) {
      lruCache.set(key, redisCachedData, { ttl });
      return res.json(JSON.parse(redisCachedData));
    }

    const response = res.json.bind(res);
    res.json = async (data) => {
      lruCache.set(key, JSON.stringify(data), { ttl });
      await redisCache.set(key, JSON.stringify(data), { PX: ttl });
      return response(data);
    };
    nxt();
  };
};

export default cache;
