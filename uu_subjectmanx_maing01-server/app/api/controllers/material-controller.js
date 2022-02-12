"use strict";
const MaterialAbl = require("../../abl/material-abl.js");

class MaterialController {

  create(ucEnv) {
    return MaterialAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new MaterialController();
