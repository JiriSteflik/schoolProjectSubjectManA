"use strict";

const SubjectmanxMainUseCaseError = require("./subjectmanx-main-use-case-error.js");
const SUBJECT_MANX_ERROR_PREFIX = `${SubjectmanxMainUseCaseError.ERROR_PREFIX}subjectManx/`;

const SayHello = {
  UC_CODE: `${SUBJECT_MANX_ERROR_PREFIX}sayHello/`,
  
};

module.exports = {
  SayHello
};
