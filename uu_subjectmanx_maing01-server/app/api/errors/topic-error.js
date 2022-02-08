"use strict";

const SubjectmanxMainUseCaseError = require("./subjectmanx-main-use-case-error.js");
const TOPIC_ERROR_PREFIX = `${SubjectmanxMainUseCaseError.ERROR_PREFIX}topic/`;

const Create = {
  UC_CODE: `${TOPIC_ERROR_PREFIX}create/`,
  InvalidDtoIn: class extends SubjectmanxMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  TopicDaoCreateFailed: class extends SubjectmanxMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}topicDaoCreateFailed`;
      this.message = "Topic by topic Dao create failed.";
    }
  },
};

const Get = {
  UC_CODE: `${TOPIC_ERROR_PREFIX}get/`,
  InvalidDtoIn: class extends SubjectmanxMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  TopicDoesNotExist: class extends SubjectmanxMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}topicDoesNotExist`;
      this.message = " Topic does not exist.";
    }
  },
};

const Update = {
  UC_CODE: `${TOPIC_ERROR_PREFIX}update/`,
  InvalidDtoIn: class extends SubjectmanxMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  TopicDoesNotExist: class extends SubjectmanxMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}topicDoesNotExist`;
      this.message = "Topic does not exist.";
    }
  },

  TopicDaoUpdateFailed: class extends SubjectmanxMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}topicDaoUpdateFailed`;
      this.message = "Update topic by topic Dao update failed.";
    }
  },
};

const List = {
  UC_CODE: `${TOPIC_ERROR_PREFIX}list/`,
  InvalidDtoIn: class extends SubjectmanxMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
};

const Remove = {
  UC_CODE: `${TOPIC_ERROR_PREFIX}remove/`,
  InvalidDtoIn: class extends SubjectmanxMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Remove.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  TopicDoesNotExist: class extends SubjectmanxMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Remove.UC_CODE}topicDoesNotExist`;
      this.message = "Topic does not exist.";
    }
  },
};

module.exports = {
  Remove,
  List,
  Update,
  Get,
  Create
};
