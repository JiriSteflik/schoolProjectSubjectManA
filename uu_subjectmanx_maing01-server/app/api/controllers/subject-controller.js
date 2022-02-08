"use strict";
const SubjectAbl = require("../../abl/subject-abl.js");

class SubjectController {

  list(ucEnv) {
    return SubjectAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  remove(ucEnv) {
    return SubjectAbl.remove(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  get(ucEnv) {
    return SubjectAbl.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  update(ucEnv) {
    return SubjectAbl.update(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

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
