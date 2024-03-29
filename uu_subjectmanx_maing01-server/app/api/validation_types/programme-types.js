/* eslint-disable */
const programmeCreateDtoInType = shape({
  name: uu5String(255).isRequired(),
  garant: uu5String(255),
  description: uu5String(2550),
  degree: oneOf(["bachelor", "magister"]),
  forms: oneOf(["full-time", "part-time"]),
  language: oneOf(["CZ", "EN"]),
  
});

const programmeUpdateDtoInType = shape({
  id: id(),
  name: uu5String(255).isRequired(),
  garant: uu5String(255),
  description: uu5String(2550),
  degree: oneOf(["bachelor", "magister"]),
  forms: oneOf(["full-time", "part-time"]),
  language: oneOf(["CZ", "EN"]),
  
});

const programmeGetDtoInType = shape({
  id: id(),
});

const programmeListDtoInType = shape({
  pageInfo: shape({
    pageIndex: number(),
    pageSize: number(),
  }),
});

const programmeRemoveDtoInType = shape({
  id: id(),
});
