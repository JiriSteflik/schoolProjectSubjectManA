/* eslint-disable */
const subjectCreateDtoInType = shape({
  name: uu5String(255).isRequired(),
  teacher: uu5String(100),
  credit: number(),
  language: oneOf(["CZ", "EN"]),
  requirement: string(1000),
  description: string(3000),
  topicList: array(),
});

const subjectUpdateDtoInType = shape({
  id: id(),
  name: uu5String(255),
  teacher: uu5String(100),
  credit: number(),
  language: oneOf(["CZ", "EN"]),
  requirement: string(1000),
  description: string(3000),
  topicList: array(),
});

const subjectGetDtoInType = shape({
  id: id(),
});

const subjectLoadDtoInType = shape({
  id: id(),
});
const subjectRemoveDtoInType = shape({
  id: id(),
});

const subjectListDtoInType = shape({
  pageInfo: shape({
    pageIndex: number(),
    pageSize: number(),
  }),
});
