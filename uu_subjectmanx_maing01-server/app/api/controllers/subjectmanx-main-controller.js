"use strict";
const SubjectmanxMainAbl = require("../../abl/subjectmanx-main-abl.js");

class SubjectmanxMainController {
  load(ucEnv) {
    return SubjectManAbl.load(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession(), ucEnv.getAuthorizationResult());
  }
  init(ucEnv) {
    return SubjectmanxMainAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }
}

module.exports = new SubjectmanxMainController();
