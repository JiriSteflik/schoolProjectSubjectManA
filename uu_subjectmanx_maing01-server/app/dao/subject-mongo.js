"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class SubjectMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1, _id: 1 }, { unique: true });
  }

  async create(subject) {
    return await super.insertOne(subject);
  }
  async update(awid, id, updateData) {
    return await super.findOneAndUpdate({ awid, id }, updateData, "NONE");
  }
  async get(awid, id) {
    return await super.findOne({ awid, id });
  }
  async remove(awid, id) {
    return await super.deleteOne({ awid, id });
  }
  async list(awid, pageInfo) {
    return await super.find({ awid }, pageInfo);
  }
  /*async setState(awid, id, state) {
    return await super.findOneAndUpdate({ awid, id }, { state }, "NO");
  }*/
}

module.exports = SubjectMongo;
