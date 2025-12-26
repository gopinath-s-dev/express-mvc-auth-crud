import Database from "../database/database.js";
import Utils from "../utils/commonFunctions.js";
import bcrypt from "bcryptjs";
const userCollection = "users";
import { ObjectId } from "mongodb";
import userSchema from "../schema/userSchema.js";

class User extends Database {
  constructor() {
    super(userSchema);
  }
  createUser = async (req) => {
    const user = req.body;
    const checkEmailExists = await this.findOne(
      userCollection,
      { emailId: user.emailId },
      {
        projection: {
          emailId: 1,
        },
      }
    );
    if (checkEmailExists) throw Utils.apiError("EmaillId already exists", 400);
    const hashedPassword = await bcrypt.hash(
      req.body.password,
      Number(process.env.BCRYPT_SALT)
    );
    user.password = hashedPassword;
    const validteData = this.validateSchema(user);
    return "";
    // return await this.insertOne(userCollection, user);
  };
  updateUser = async (req) => {
    const user = req.body;
    const validteData = this.validateSchema(user);
    return await this.updateOne(
      userCollection,
      { _id: ObjectId.createFromHexString(req.params.id) },
      {
        $set: validteData,
      }
    );
  };
  fetchUser = async (uid) => {
    return await this.findOne(userCollection, {
      _id: ObjectId.createFromHexString(uid),
    });
  };
  fetchUsersList = async () => {
    return await this.findAll(userCollection, {});
  };
  deleteUser = async (uid) => {
    return await this.deleteOne(userCollection, {
      _id: ObjectId.createFromHexString(uid),
    });
  };
  fetchUserByEmailId = async (emailId) => {
    return await this.findOne(userCollection, {
      emailId,
    });
  };
}

export default new User();
