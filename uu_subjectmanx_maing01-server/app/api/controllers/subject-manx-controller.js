"use strict";
const SubjectManxAbl = require("../../abl/subject-manx-abl.js");

class SubjectManxController {

  sayHello(ucEnv) {
    return SubjectManxAbl.sayHello(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new SubjectManxController();
