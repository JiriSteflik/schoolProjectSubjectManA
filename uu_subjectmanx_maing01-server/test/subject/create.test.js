const { TestHelper } = require("uu_appg01_server-test");
const USE_CASE = "subject/create";

beforeAll(async () => {
  await TestHelper.setup();
  await TestHelper.initUuSubAppInstance();
  await TestHelper.createUuAppWorkspace();
});
beforeEach(async () => {
  //Turned off auth, profiles are not set up yet
  await TestHelper.setup({ authEnabled: false, sysStatesEnabled: false });
});

afterAll(async () => {
  await TestHelper.teardown();
});

describe("Testing subject/create", () => {
  test("subject/create - HDS", async () => {
    expect.assertions(8);

    let dtoIn = {
      name: "subjectName",
      description: "description",
      requirement: "requirement",
      credit: 2,
      language: "CZ",
      teacher:"Pepa Tronek",
    };
    let result = await TestHelper.executePostCommand("subject/create", dtoIn);

    expect(result.status).toEqual(200);
    expect(result.uuAppErrorMap).toEqual({});
    expect(result.awid).toEqual(TestHelper.getAwid());
    expect(result.description).toEqual(dtoIn.description);
    expect(result.requirement).toEqual(dtoIn.requirement);
    expect(result.credit).toEqual(dtoIn.credit);
    expect(result.language).toEqual(dtoIn.language);
    expect(result.teacher).toEqual(dtoIn.teacher);
  });
  test("subject/create - Warning 1.2.1", async () => {
    expect.assertions(7);

    let dtoIn = {
      name: "subjectName",
      description: "description",
      requirement: "requirement",
      credit: 2,
      language: "CZ",

      teacher: "Pepa Tronek",
      unsupportedKey: "Ve středu bude pršet",
    };
    let result = await TestHelper.executePostCommand("subject/create", dtoIn);

    expect(result.status).toEqual(200);
    expect(result.awid).toEqual(TestHelper.getAwid());
    expect(result.description).toEqual(dtoIn.description);
    expect(result.requirement).toEqual(dtoIn.requirement);
    expect(result.credit).toEqual(dtoIn.credit);
    expect(result.language).toEqual(dtoIn.language);
    expect(result.teacher).toEqual(dtoIn.teacher);

   
  });
  test("subject/create - Error 1.3.1", async () => {
    expect.assertions(3);

    let dtoIn = {
      name: "subjectName",
      description: "description",
      requirement: "requirement",
      credit: 2,
      language: 3,

      teacher: "Pepa Tronek",
    };
    try {
      await TestHelper.executePostCommand("subject/create", dtoIn);
    } catch (error) {
      expect(error.status).toEqual(400);
      expect(error.code).toEqual(`uu-subjectmanx-main/subject/create/invalidDtoIn`);
      expect(error.message).toEqual(`DtoIn is not valid.`);
    }
  });
});
