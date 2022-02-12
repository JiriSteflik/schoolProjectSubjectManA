//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useDataList } from "uu5g04-hooks";
import Calls from "../calls";
//@@viewOff:imports

function withDataList(Component, displayName) {
  return createComponent({
    //@@viewOn:statics
    displayName,
    //@@viewOff:statics

    //@@viewOn:propTypes
    propTypes: {},
    //@@viewOff:propTypes

    //@@viewOn:defaultProps
    defaultProps: {},
    //@@viewOff:defaultProps

    //@@viewOn:render
    render(props) {
      const topicData = useDataList({
        handlerMap: {
          load: Calls.listTopic,
        },
        initialDtoIn: {},
      });

      let result;

      switch (topicData.state) {
        case "pendingNoData":
        case "pending":
          result = <UU5.Bricks.Loading />;
          break;
        case "readyNoData":
        case "ready":
          result = <Component {...props} data={topicData.data} />;
          break;
        case "errorNoData":
        case "error":
          result = <UU5.Bricks.Error data={topicData.error} />;
      }

      return result;
    },
  });
  //@@viewOff:render
}

export default withDataList;
