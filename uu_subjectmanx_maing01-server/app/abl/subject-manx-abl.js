"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/subject-manx-error.js");

const WARNINGS = {

};

class SubjectManxAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("subjectManx");
  }

  async sayHello(awid, dtoIn) {
    return "hello world Jirka"
  }

}

module.exports = new SubjectManxAbl();
