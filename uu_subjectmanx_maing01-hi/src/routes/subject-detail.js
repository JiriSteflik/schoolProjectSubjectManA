//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useDataObject } from "uu5g04-hooks";
import Calls from "../calls";
import Config from "./config/config";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "SubjectDetail",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const SubjectDetail = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
  
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const subjectData = useDataObject({
      handlerMap: {
        load: Calls.getSubject,
      },
      initialDtoIn: {
        id: props.params.id,
      },
    });

    console.log(subjectData);
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const className = Config.Css.css``;
    const attrs = UU5.Common.VisualComponent.getAttrs(props, className);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);
    function getResult() {
      let result;
      if (subjectData.state.includes("pending")) {
        result = <UU5.Bricks.Loading />;
      } else if (subjectData.state.includes("error")) {
        result = <UU5.Common.Error errorData={subjectData.errorData} />;
      } else {
        result = (
          <div>
            <UU5.Bricks.Container>
              <UU5.Bricks.Card colorSchema="blue">
                <b>{subjectData.data.name}</b>
                <div>{subjectData.data.teacher}</div>
                <div>{subjectData.data.credit}</div>
              </UU5.Bricks.Card>
              <UU5.Bricks.Card colorSchema="blue">
                <div>{subjectData.data.requirement}</div>
                <div>{subjectData.data.description}</div>
              </UU5.Bricks.Card>
              <UU5.Bricks.Card colorSchema="blue">
                <div>{subjectData.data.description}</div>
              </UU5.Bricks.Card>
              <UU5.Bricks.Panel
                header={subjectData.data.topicList}
                colorSchema="blue"
                iconExpanded="mdi-chevron-up"
                iconCollapsed="mdi-chevron-down"
                content={
                  <UU5.Bricks.Block background colorSchema="blue">
                    {subjectData.data.topicList}
                  </UU5.Bricks.Block>
                }
              />
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

export default SubjectDetail;
