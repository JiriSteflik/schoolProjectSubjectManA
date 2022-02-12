"use strict";

const SubjectmanxMainUseCaseError = require("./subjectmanx-main-use-case-error.js");
const SUBJECT_ERROR_PREFIX = `${SubjectmanxMainUseCaseError.ERROR_PREFIX}subject/`;

const Create = {
  UC_CODE: `${SUBJECT_ERROR_PREFIX}create/`,

  InvalidDtoIn: class extends SubjectmanxMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  SubjectDaoCreateFailed: class extends SubjectmanxMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}subjectDaoCreateFailed`;
      this.message = "Create subject by subject Dao create failed.";
    }
  },
  SubjectCustomError: class extends SubjectmanxMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}subjectCustomError`;
      this.message = "Some error has occurred.";
    }
  },
};

const Update = {
  UC_CODE: `${SUBJECT_ERROR_PREFIX}update/`,
  InvalidDtoIn: class extends SubjectmanxMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  SubjectDaoUpdateFailed: class extends SubjectmanxMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}subjectDaoUpdateFailed`;
      this.message = "Update Subject by subject Dao update failed.";
    }
  },
};

const Get = {
  UC_CODE: `${SUBJECT_ERROR_PREFIX}get/`,
  InvalidDtoIn: class extends SubjectmanxMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  SubjectDoesNotExist: class extends SubjectmanxMainUseCaseError {
    constructor() {
      super(...arguments)
      this.code = `${Get.UC_CODE}subjectDoesNotExist`;
      this.message = " Subject does not exist."
    }
  }
};

const Remove = {
  UC_CODE: `${SUBJECT_ERROR_PREFIX}remove/`,
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
      this.code = `${Remove.UC_CODE}subjectDaoUpdateFailed`;
      this.message = "Remove Subject by subject Dao update failed.";
    }
  }
};

const List = {
  UC_CODE: `${SUBJECT_ERROR_PREFIX}list/`,
  InvalidDtoIn: class extends SubjectmanxMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
};

module.exports = {
  List,
  Remove,
  Get,
  Update,
  Create,
};
