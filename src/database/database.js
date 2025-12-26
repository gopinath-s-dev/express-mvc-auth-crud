import getDb from "../config/mongoConnection.js";
import Utils from "../utils/commonFunctions.js";

class Database {
  constructor(model) {
    this.model = model;
  }

  validateSchema = (data) => {
    data._convertSchemaByCreate = "create";
    data.anc = 122;
    const validate = this.model(data);
    if (validate) return data;
    else {
      throw Utils.apiError(
        `Invalid data:${JSON.stringify(this.model.errors)}`,
        400
      );
    }
  };

  insertOne = async (collection, data, options = {}) => {
    return await getDb().collection(collection).insertOne(data, options);
  };
  insertMany = async (collection, data, options = {}) => {
    return await getDb().collection(collection).insertMany(data, options);
  };
  findOne = async (collection, filter, options = {}) => {
    return await getDb().collection(collection).findOne(filter, options);
  };
  findAll = async (collection, filter, options = {}) => {
    return await getDb().collection(collection).find(filter, options).toArray();
  };
  findOneAndUpdate = async (collection, filter, data, options = {}) => {
    return await getDb()
      .collection(collection)
      .findOneAndUpdate(filter, data, options);
  };
  findAndModify = async (collection, filter, data, options = {}) => {
    return await getDb()
      .collection(collection)
      .findAndModify(filter, data, options);
  };
  updateOne = async (collection, filter, data, options = {}) => {
    return await getDb()
      .collection(collection)
      .updateOne(filter, data, options);
  };
  updateMany = async (collection, filter, data, options = {}) => {
    return await getDb()
      .collection(collection)
      .updateMany(filter, data, options);
  };
  deleteOne = async (collection, filter) => {
    return await getDb().collection(collection).deleteOne(filter);
  };
  deleteMany = async (collection, filter) => {
    return await getDb().collection(collection).deleteMany(filter);
  };
  aggregate = async (collection, filter, options = {}) => {
    return await getDb()
      .collection(collection)
      .aggregate(filter, options)
      .toArray();
  };
  bulkWrite = async (collection, data, options = {}) => {
    return await getDb().collection(collection).bulkWrite(data, options);
  };
}

export default Database;
