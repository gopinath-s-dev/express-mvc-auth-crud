import { LRUCache } from "lru-cache";

const lruCache = new LRUCache({
  max: 1000,
});

export default lruCache;
