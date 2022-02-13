"use strict";
const MaterialAbl = require("../../abl/material-abl.js");

class MaterialController {

  remove(ucEnv) {
    return MaterialAbl.remove(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  create(ucEnv) {
    return MaterialAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new MaterialController();
