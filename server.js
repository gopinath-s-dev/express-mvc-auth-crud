import app from "./src/index.js";
const Port = process.env.PORT || 8080;
import { connectMongo } from "./src/config/mongoConnection.js";

const start = async () => {
  try {
    await connectMongo();
    app.listen(Port, () => {
      console.log(`Express Application is running on Port ${Port}`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
