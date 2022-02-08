"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class TopicMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1, _id: 1 }, { unique: true });
  }

  async create(topic) {
    return await super.insertOne(topic);
  }
  async get(awid, id) {
    return await super.findOne({ awid, id });
  }
  async update(uuObject) {
    let filter = { id: uuObject.id, awid: uuObject.awid };
    return await super.findOneAndUpdate(filter, uuObject, "NONE");
  }
  async list(awid, pageInfo) {
    const filter = { awid };
    return await super.find(filter, pageInfo);
  }
  async remove(awid, id) {
    await super.deleteOne({ awid, id });
  }
}


module.exports = TopicMongo;
