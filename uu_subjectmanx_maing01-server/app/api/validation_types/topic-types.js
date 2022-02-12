/* eslint-disable */
const topicCreateDtoInType = shape({
  name: uu5String(100).isRequired(),
  description: uu5String(1000),
  materialList: array(),
});

const topicGetDtoInType = shape({
  id: id().isRequired(),
});

const topicUpdateDtoInType = shape({
  id: id().isRequired(),
  name: uu5String(100),
  description: uu5String(1000),
});

const topicListDtoInType = shape({
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer(),
  }),
});

const topicRemoveDtoInType = shape({
  id: id(),
});
