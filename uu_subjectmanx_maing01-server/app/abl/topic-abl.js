"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/topic-error.js");

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`,
  },
  getUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`,
  },
  updateUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`,
  },
  listUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`,
  },
  removeUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`,
  },
};
class TopicAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("topic");
  }

  async remove(awid, dtoIn) {
    let validationResult = this.validator.validate("topicRemoveDtoInType", dtoIn);

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
        throw new Errors.Remove.TopicDaoRemoveFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    return { uuAppErrorMap };
  }

  async list(awid, dtoIn) {
    let validationResult = this.validator.validate("topicListDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.listUnsupportedKeys.code,
      Errors.List.InvalidDtoIn
    );

    let list;
    list = await this.dao.list(awid, dtoIn.pageInfo);

    list.uuAppErrorMap = uuAppErrorMap;
    return list;
  }

  async update(awid, dtoIn) {
    let validationResult = this.validator.validate("topicUpdateDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.updateUnsupportedKeys.code,
      Errors.Update.InvalidDtoIn
    );

    let topic = await this.dao.get(awid, dtoIn.id);
    if (!topic) {
      throw new Errors.Update.TopicDoesNotExist({ uuAppErrorMap }, { topicId: dtoIn.id });
    }

    try {
      dtoIn.awid = awid;
      topic = await this.dao.update(dtoIn);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.Update.TopicDaoUpdateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    topic.uuAppErrorMap = uuAppErrorMap;
    return topic;
  }

  async get(awid, dtoIn) {
    let validationResult = this.validator.validate("subjectGetDtoInType", dtoIn);

    // hds 1.2, 1.3 // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.getUnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );
    let topic = await this.dao.get(awid, dtoIn.id);
    if (!topic) {
      throw new Errors.Get.TopicDoesNotExist({ uuAppErrorMap }, { id: dtoIn.id });
    }
    topic.uuAppErrorMap = uuAppErrorMap;

    return topic;
  }

  async create(awid, dtoIn) {
    // hds 1, 1.1
    let validationResult = this.validator.validate("topicCreateDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    dtoIn.awid = awid;

    let topic;
    try {
      topic = await this.dao.create(dtoIn);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.Create.TopicDaoCreateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    topic.uuAppErrorMap = uuAppErrorMap;
    return topic;
  }
}



module.exports = new TopicAbl();
