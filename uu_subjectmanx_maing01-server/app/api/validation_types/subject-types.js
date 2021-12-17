/* eslint-disable */
const subjectCreateDtoInType = shape({
  name: uu5String(255).isRequired(),
  teacher: uu5String(100),
  credit: number(),
  degree: oneOf(["Bc.", "Ing.", "Mgr."]),
  requirement: string(1000),
  description: string(3000),
});