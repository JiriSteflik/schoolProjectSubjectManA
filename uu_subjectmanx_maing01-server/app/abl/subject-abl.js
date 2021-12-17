"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/subject-error.js");

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`,
  },
};

const EXECUTIVES_PROFILE = "Executives";

class SubjectAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("subject");
  }

  async create(awid, dtoIn, session, authorizationResult) {
    // hds 1, 1.1
    let validationResult = this.validator.validate("subjectCreateDtoInType", dtoIn);

    // hds 1.2, 1.3 // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    // hds 2
    dtoIn.visibility = authorizationResult.getAuthorizedProfiles().includes(EXECUTIVES_PROFILE);

    // hds 3
    dtoIn.uuIdentity = session.getIdentity().getUuIdentity();
    dtoIn.uuIdentityName = session.getIdentity().getName();

    // hds 4
    dtoIn.awid = awid;
    let dtoOut;
    try {
      dtoOut = await this.dao.create(dtoIn);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        // A3
        throw new Errors.CreateSubject.SubjectDaoCreateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    // hds 5
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }
}

module.exports = new SubjectAbl();
