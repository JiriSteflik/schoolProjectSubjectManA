"use strict";
const SubjectmanxMainAbl = require("../../abl/subjectmanx-main-abl.js");

class SubjectmanxMainController {
  init(ucEnv) {
    return SubjectmanxMainAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }
}

module.exports = new SubjectmanxMainController();
