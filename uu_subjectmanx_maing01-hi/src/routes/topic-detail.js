//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useDataObject } from "uu5g04-hooks";
import Calls from "../calls";
import Config from "./config/config";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "TopicDetail",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const TopicDetail = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const topicData = useDataObject({
      handlerMap: {
        load: Calls.getTopic,
      },
      initialDtoIn: {
        id: props.params.id,
      },
    });
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const className = Config.Css.css``;
    const attrs = UU5.Common.VisualComponent.getAttrs(props, className);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);
    function getResult() {
      let result;
      if (topicData.state.includes("pending")) {
        result = <UU5.Bricks.Loading />;
      } else if (topicData.state.includes("error")) {
        result = <UU5.Common.Error errorData={topicData.errorData} />;
      } else {
        result = (
          <div>
            <UU5.Bricks.Container>
              <UU5.Bricks.Card colorSchema="blue">
                <b>{topicData.data.name}</b>
                <div>{topicData.data.description}</div>
              </UU5.Bricks.Card>
            </UU5.Bricks.Container>
          </div>
        );
      }
      return result;
    }
    return currentNestingLevel ? <div {...attrs}>{getResult()}</div> : null;
    //@@viewOff:render
  },
});
export default TopicDetail;
