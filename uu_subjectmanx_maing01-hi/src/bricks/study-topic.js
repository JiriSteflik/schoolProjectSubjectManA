//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "StudyTopic",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const StudyTopic = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const className = Config.Css.css`
    text-align:left;
    box-shadow: 3px 1px 7px #5589e6;
    padding: 2rem;
    margin: 1rem;
    
    float: center;
    border-radius: 25px;
    `;
    const attrs = UU5.Common.VisualComponent.getAttrs(props, className);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(
      props,
      STATICS
    );

    return currentNestingLevel ? (
      <div>
        <div {...attrs}>
          <UU5.Bricks.Panel
            header="Topic1"
            colorSchema="white"
            iconExpanded="mdi-chevron-up"
            iconCollapsed="mdi-chevron-down"
          />
        </div>
        <div {...attrs}>
          <UU5.Bricks.Panel
            header="Topic2"
            colorSchema="white"
            iconExpanded="mdi-chevron-up"
            iconCollapsed="mdi-chevron-down"
          />
        </div>
        <div {...attrs}>
          <UU5.Bricks.Panel
            header="Topic3"
            colorSchema="white"
            iconExpanded="mdi-chevron-up"
            iconCollapsed="mdi-chevron-down"
          />
        </div>
        <div {...attrs}>
          <UU5.Bricks.Panel
            header="Topic4"
            colorSchema="white"
            iconExpanded="mdi-chevron-up"
            iconCollapsed="mdi-chevron-down"
            content={<UU5.Bricks.Calendar />}
          />
        </div>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

export default StudyTopic;
