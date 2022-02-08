"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class ProgrammeMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1, _id: 1 }, { unique: true });
  }

  async create(programme) {
    return await super.insertOne(programme);
  }
  async get(awid, id) {
    return await super.findOne({ awid, id });
  }
  async update(awid, id, updateData) {
    return await super.findOneAndUpdate({ awid, id }, updateData, "NONE");
  }
  async list(awid, pageInfo) {
    return await super.find({ awid }, pageInfo);
  }
  async remove(awid, id) {
    return await super.deleteOne({ awid, id });
  }
}

module.exports = ProgrammeMongo;
