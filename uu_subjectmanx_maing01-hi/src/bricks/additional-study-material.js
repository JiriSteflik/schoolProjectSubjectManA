import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import StudyTopic from "./study-topic";
import Lsi from "../routes/subject.lsi";

//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "StudyMaterial",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const AdditionalStudyMaterial = createVisualComponent({
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
    border-radius: 25px;`;

    const attrs = UU5.Common.VisualComponent.getAttrs(props, className);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    return currentNestingLevel ? (
      
        <UU5.Bricks.Container {...attrs}>
          <UU5.Bricks.Lsi lsi={Lsi.subjectDescription.subjectDes} />
        </UU5.Bricks.Container>
      
    ) : null;
    //@@viewOff:render
  },
});

export default AdditionalStudyMaterial;
