"use strict";

const SubjectmanxMainUseCaseError = require("./subjectmanx-main-use-case-error.js");
const PROGRAMME_ERROR_PREFIX = `${SubjectmanxMainUseCaseError.ERROR_PREFIX}programme/`;

const Create = {
  UC_CODE: `${PROGRAMME_ERROR_PREFIX}create/`,
  InvalidDtoIn: class extends SubjectmanxMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  ProgrammeDaoCreateFailed: class extends SubjectmanxMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}programmeDaoCreateFailed`;
      this.message = "Programme by programme Dao create failed.";
    }
  },
};

const Get = {
  UC_CODE: `${PROGRAMME_ERROR_PREFIX}get/`,
  InvalidDtoIn: class extends SubjectmanxMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  ProgrammeDoesNotExist: class extends SubjectmanxMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}programmeDoesNotExist`;
      this.message = " Programme does not exist.";
    }
  },
};

const Update = {
  UC_CODE: `${PROGRAMME_ERROR_PREFIX}update/`,
  InvalidDtoIn: class extends SubjectmanxMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  ProgrammeDaoUpdateFailed: class extends SubjectmanxMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}updatetDaoUpdateFailed`;
      this.message = "Update programme by programme Dao update failed.";
    }
  },
};

const List = {
  UC_CODE: `${PROGRAMME_ERROR_PREFIX}list/`,
  InvalidDtoIn: class extends SubjectmanxMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
};

const Remove = {
  UC_CODE: `${PROGRAMME_ERROR_PREFIX}remove/`,
  InvalidDtoIn: class extends SubjectmanxMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Remove.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  ProgrammeDaoRemoveFailed: class extends SubjectmanxMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Remove.UC_CODE}programmeDaoUpdateFailed`;
      this.message = "Remove Programme by programme Dao update failed.";
    }
  },
};

module.exports = {
  Remove,
  List,
  Update,
  Get,
  Create,
};
