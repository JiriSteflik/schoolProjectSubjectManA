"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class MaterialMongo extends UuObjectDao {
  async createSchema() {}
  
  async create(subject) {
    return await super.insertOne(subject);
  }
}

module.exports = MaterialMongo;
