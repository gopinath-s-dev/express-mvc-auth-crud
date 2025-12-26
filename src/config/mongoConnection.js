import { MongoClient, ServerApiVersion } from "mongodb";

const mongoUri = process.env.SERVER_DB_URI;
const dbName = process.env.DB_NAME;

let db = null;
const connectMongo = async () => {
  const client = new MongoClient(mongoUri, {
    appName: "Express-App",
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    db = client.db(dbName);

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (err) {
    client.close();
    console.error(err);
  }
};

const getDB = () => db;

export { connectMongo };
export default getDB;
