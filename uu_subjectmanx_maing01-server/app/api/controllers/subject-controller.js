"use strict";
const SubjectAbl = require("../../abl/subject-abl.js");

class SubjectController {

  create(ucEnv) {
    return SubjectAbl.create(
      ucEnv.getUri().getAwid(),
      ucEnv.getDtoIn(),
      ucEnv.getSession(),
      ucEnv.getAuthorizationResult()
    );
  }

}

module.exports = new SubjectController();
