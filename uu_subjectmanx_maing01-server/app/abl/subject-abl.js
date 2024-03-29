"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError, ObjectStore } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/subject-error.js");

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`,
  },
  updateUnsupportedKeys: {
    code: `${Errors.Update.UC_CODE}unsupportedKeys`,
  },
  getUnsupportedKeys: {
    code: `${Errors.Get.UC_CODE}unsupportedKeys`,
  },
  removeUnsupportedKeys: {
    code: `${Errors.Remove.UC_CODE}unsupportedKeys`,
  },
  listUnsupportedKeys: {
    code: `${Errors.List.UC_CODE}unsupportedKeys`,
  },
  loadUnsupportedKeys: {
    code: `${Errors.Load.UC_CODE}unsupportedKeys`,
  },
};

const EXECUTIVES_PROFILE = "Authorities";

class SubjectAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("subject");
    this.topicDao = DaoFactory.getDao("topic");
  }

  async load(awid, dtoIn) {
    // hds 1, 1.1
    let validationResult = this.validator.validate("subjectLoadDtoInType", dtoIn);

    // hds 1.2, 1.3 // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.loadUnsupportedKeys.code,
      Errors.Load.InvalidDtoIn
    );
    let subject = await this.dao.get(awid, dtoIn.id);
    if (!subject) {
      throw new Errors.Load.SubjectDoesNotExist({ uuAppErrorMap }, { id: dtoIn.id });
    }

    subject.topicList = (await this.topicDao.listByIdList(awid, subject.topicList)).itemList;
    subject.uuAppErrorMap = uuAppErrorMap;

    return subject;
  }

  async list(awid, dtoIn, getAuthorizationResult) {
    // hds 1, 1.1
    let validationResult = this.validator.validate("subjectListDtoInType", dtoIn);

    // hds 1.2, 1.3 // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.listUnsupportedKeys.code,
      Errors.List.InvalidDtoIn
    );
    const listResult = await this.dao.list(awid, dtoIn.pageInfo, dtoIn.id);

    return { ...listResult, uuAppErrorMap };
  }

  async remove(awid, dtoIn) {
    let validationResult = this.validator.validate("subjectRemoveDtoInType", dtoIn);

    // hds 1.2, 1.3 // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.removeUnsupportedKeys.code,
      Errors.Remove.InvalidDtoIn
    );
    // hds 2
    try {
      await this.dao.remove(awid, dtoIn.id);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.Remove.SubjectDaoRemoveFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }
    // hds 3
    return { uuAppErrorMap };
  }

  async get(awid, dtoIn) {
    // HDS 1
    let validationResult = this.validator.validate("subjectGetDtoInType", dtoIn);

    // hds 1.2, 1.3 // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.getUnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );
    //hds2
    let subject = await this.dao.get(awid, dtoIn.id);
    if (!subject) {
      throw new Errors.Get.SubjectDoesNotExist({ uuAppErrorMap }, { id: dtoIn.id });
    }
    subject.uuAppErrorMap = uuAppErrorMap;
    //hds 3
    return subject;
  }

  async update(awid, dtoIn, session) {
    let validationResult = this.validator.validate("subjectUpdateDtoInType", dtoIn);

    // hds 1.2, 1.3 // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.updateUnsupportedKeys.code,
      Errors.Update.InvalidDtoIn
    );

    // hds 4
    let dtoOut;
    try {
      dtoOut = await this.dao.update(awid, dtoIn.id, dtoIn);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        // A3
        throw new Errors.Update.SubjectDaoUpdateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }
    // hds 5
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async create(awid, dtoIn, session) {
    // hds 1, 1.1
    let validationResult = this.validator.validate("subjectCreateDtoInType", dtoIn);

    // hds 1.2, 1.3 // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );
    if (!("topicList" in dtoIn)) dtoIn.topicList = [];
    // hds 2
    let existingTopicList = (await this.topicDao.listByIdList(awid, dtoIn.topicList)).itemList;
    existingTopicList = existingTopicList.map((topic) => topic.id.toString());

    if (existingTopicList.length !== dtoIn.topicList.length) {
      const missingTopicList = [];
      dtoIn.topicList.forEach((id) => {
        if (!existingTopicList.find((existingTopicId) => existingTopicId === id)) {
          missingTopicList.push(id);
        }
      });

      //throw new Errors.Create.TopicDoesNotExist({ uuAppErrorMap }, { missingTopicList });
    }
    dtoIn.awid = awid;
    let dtoOut;

    // hds 3
    dtoIn.uuIdentity = session.getIdentity().getUuIdentity();
    dtoIn.uuIdentityName = session.getIdentity().getName();

    // hds 4

    try {
      dtoOut = await this.dao.create(dtoIn);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        // A3
        throw new Errors.Create.SubjectDaoCreateFailed({ uuAppErrorMap }, e);
      } else throw new Errors.Create.SubjectCustomError({ uuAppErrorMap }, e);
    }

    // hds 5
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }
}

module.exports = new SubjectAbl();
