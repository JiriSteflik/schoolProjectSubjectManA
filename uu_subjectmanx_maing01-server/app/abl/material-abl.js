"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/material-error.js");

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`,
  },
  createUnsupportedKeys: {
    code: `${Errors.Remove.UC_CODE}unsupportedKeys`,
  },
};

class MaterialAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("material");
  }

  async remove(awid, dtoIn) {
     let validationResult = this.validator.validate("materialRemoveDtoInType", dtoIn);

    // hds 1.2, 1.3 // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.removeUnsupportedKeys.code,
      Errors.Remove.InvalidDtoIn
    );

    try {
      await this.dao.remove(awid, dtoIn.id);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.Remove.MaterialDaoRemoveFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    return { uuAppErrorMap };
  }

  

  async create(awid, dtoIn) {
    // hds 1, 1.1
    let validationResult = this.validator.validate("materialCreateDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    dtoIn.awid = awid;

    let dtoOut;
    try {
      dtoOut = await this.dao.create(dtoIn);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.Create.materialDaoCreateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }
}

module.exports = new MaterialAbl();
