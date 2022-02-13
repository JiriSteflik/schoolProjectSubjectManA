/* eslint-disable */
const materialCreateDtoInType = shape({
  name: uu5String(100),
  link: uu5String(255),
  type: oneOf(["video", "youtube", "uuBook", "uuCourse", "link"]),
});
const materialRemoveDtoInType = shape({
  id: id(),
});