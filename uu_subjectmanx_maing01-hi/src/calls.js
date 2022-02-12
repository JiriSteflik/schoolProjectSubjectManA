/**
 * Server calls of application client.
 */
import UU5 from "uu5g04";
import Plus4U5 from "uu_plus4u5g01";

let Calls = {
  /** URL containing app base, e.g. "https://uuapp.plus4u.net/vendor-app-subapp/awid/". */
  APP_BASE_URI: location.protocol + "//" + location.host + UU5.Environment.getAppBasePath(),

  async call(method, url, dtoIn, clientOptions) {
    let response = await Plus4U5.Common.Calls.call(method, url, dtoIn, clientOptions);
    return response.data;
  },

  loadDemoContent(dtoIn) {
    let commandUri = Calls.getCommandUri("loadDemoContent");
    return Calls.call("get", commandUri, dtoIn);
  },

  loadIdentityProfiles() {
    let commandUri = Calls.getCommandUri("sys/uuAppWorkspace/initUve");
    return Calls.call("get", commandUri, {});
  },

  initWorkspace(dtoInData) {
    let commandUri = Calls.getCommandUri("sys/uuAppWorkspace/init");
    return Calls.call("post", commandUri, dtoInData);
  },

  getWorkspace() {
    let commandUri = Calls.getCommandUri("sys/uuAppWorkspace/get");
    return Calls.call("get", commandUri, {});
  },

  getProgramme(dtoIn) {
    let commandUri = Calls.getCommandUri("programme/get");
    return Calls.call("get", commandUri, dtoIn);
  },
  createProgramme(dtoIn) {
    let commandUri = Calls.getCommandUri("programme/create");
    return Calls.call("post", commandUri, dtoIn);
  },
  updateProgramme(dtoIn) {
    let commandUri = Calls.getCommandUri("programme/update");
    return Calls.call("post", commandUri, dtoIn);
  },
  deleteProgramme(dtoIn) {
    let commandUri = Calls.getCommandUri("programme/remove");
    return Calls.call("post", commandUri, dtoIn);
  },
  listProgramme(dtoIn) {
    let commandUri = Calls.getCommandUri("programme/list");
    return Calls.call("get", commandUri, dtoIn);
  },
  listSubject(dtoIn) {
    let commandUri = Calls.getCommandUri("subject/list");
    return Calls.call("get", commandUri, dtoIn);
  },
  getSubject(dtoIn) {
    let commandUri = Calls.getCommandUri("subject/get");
    return Calls.call("get", commandUri, dtoIn);
  },
  createSubject(dtoIn) {
    let commandUri = Calls.getCommandUri("subject/create");
    return Calls.call("post", commandUri, dtoIn);
  },
  updateSubject(dtoIn) {
    let commandUri = Calls.getCommandUri("subject/update");
    return Calls.call("post", commandUri, dtoIn);
  },
  deleteSubject(dtoIn) {
    let commandUri = Calls.getCommandUri("subject/remove");
    return Calls.call("post", commandUri, dtoIn);
  },
  listTopic(dtoIn) {
    let commandUri = Calls.getCommandUri("topic/list");
    return Calls.call("get", commandUri, dtoIn);
  },
  deleteTopic(dtoIn) {
    let commandUri = Calls.getCommandUri("topic/remove");
    return Calls.call("post", commandUri, dtoIn);
  },
  createTopic(dtoIn) {
    let commandUri = Calls.getCommandUri("topic/create");
    return Calls.call("post", commandUri, dtoIn);
  },
  getTopic(dtoIn) {
    let commandUri = Calls.getCommandUri("topic/get");
    return Calls.call("get", commandUri, dtoIn);
  },
  updateTopic(dtoIn) {
    let commandUri = Calls.getCommandUri("topic/update");
    return Calls.call("get", commandUri, dtoIn);
  },

  async initAndGetWorkspace(dtoInData) {
    await Calls.initWorkspace(dtoInData);
    return await Calls.getWorkspace();
  },

  /*
  For calling command on specific server, in case of developing client site with already deployed
  server in uuCloud etc. You can specify url of this application (or part of url) in development
  configuration in *-client/env/development.json, for example:
   {
     ...
     "uu5Environment": {
       "gatewayUri": "https://uuapp.plus4u.net",
       "awid": "b9164294f78e4cd51590010882445ae5",
       "vendor": "uu",
       "app": "demoappg01",
       "subApp": "main"
     }
   }
   */
  getCommandUri(aUseCase) {
    // useCase <=> e.g. "getSomething" or "sys/getSomething"
    // add useCase to the application base URI
    let targetUriStr = Calls.APP_BASE_URI + aUseCase.replace(/^\/+/, "");

    // override tid / awid if it's present in environment (use also its gateway in such case)
    if (process.env.NODE_ENV !== "production") {
      let env = UU5.Environment;
      if (env.tid || env.awid || env.vendor || env.app) {
        let url = Plus4U5.Common.Url.parse(targetUriStr);
        if (env.tid || env.awid) {
          if (env.gatewayUri) {
            let match = env.gatewayUri.match(/^([^:]*):\/\/([^/]+?)(?::(\d+))?(\/|$)/);
            if (match) {
              url.protocol = match[1];
              url.hostName = match[2];
              url.port = match[3];
            }
          }
          if (env.tid) url.tid = env.tid;
          if (env.awid) url.awid = env.awid;
        }
        if (env.vendor || env.app) {
          if (env.vendor) url.vendor = env.vendor;
          if (env.app) url.app = env.app;
          if (env.subApp) url.subApp = env.subApp;
        }
        targetUriStr = url.toString();
      }
    }

    return targetUriStr;
  },
};

export default Calls;
