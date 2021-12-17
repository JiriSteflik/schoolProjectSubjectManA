//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import StudyTopic from "./study-topic";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "StudyMaterial",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const StudyMaterial = createVisualComponent({
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
    text-align:center;
    box-shadow: 5px 10px 18px #5589e6;
    padding: 0.5rem;
    margin: 3rem;
    float: center;
    border: 4px solid 5589e6;
    border-radius: 25px;`;
    const attrs = UU5.Common.VisualComponent.getAttrs(props, className);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(
      props,
      STATICS
    );

    return currentNestingLevel ? (
      <div {...attrs}>
        
          <StudyTopic/>
          
        
      </div>
    ) : null;
    //@@viewOff:render
  },
});

export default StudyMaterial;
