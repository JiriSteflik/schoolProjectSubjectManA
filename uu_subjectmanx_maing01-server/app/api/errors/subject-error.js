"use strict";

const SubjectmanxMainUseCaseError = require("./subjectmanx-main-use-case-error.js");
const SUBJECT_ERROR_PREFIX = `${SubjectmanxMainUseCaseError.ERROR_PREFIX}subject/`;

const Create = {
  UC_CODE: `${SUBJECT_ERROR_PREFIX}create/`,
  
};

module.exports = {
  Create
};
