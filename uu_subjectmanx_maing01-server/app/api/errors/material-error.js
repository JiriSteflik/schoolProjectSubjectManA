"use strict";

const SubjectmanxMainUseCaseError = require("./subjectmanx-main-use-case-error.js");
const MATERIAL_ERROR_PREFIX = `${SubjectmanxMainUseCaseError.ERROR_PREFIX}material/`;

const Create = {
  UC_CODE: `${MATERIAL_ERROR_PREFIX}create/`,
  

  InvalidDtoIn: class extends SubjectmanxMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  MaterialDaoCreateFailed: class extends SubjectmanxMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}materialDaoCreateFailed`;
      this.message = "Create material by material Dao create failed.";
    }
  },
  MaterialCustomError: class extends SubjectmanxMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}materialCustomError`;
      this.message = "Some error has occurred.";
    }
  },
};

const Remove = {
  UC_CODE: `${MATERIAL_ERROR_PREFIX}remove/`,
  InvalidDtoIn: class extends SubjectmanxMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Remove.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  SubjectDaoRemoveFailed: class extends SubjectmanxMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Remove.UC_CODE}materialDaoUpdateFailed`;
      this.message = "Remove material by material Dao update failed.";
    }
  },
};

module.exports = {
  Remove,
  Create
};
