//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import StudyTopic from "./study-topic";
import Lsi from "../routes/subject.lsi";
import AdditionalStudyMaterial from "./additional-study-material";

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
   
    
    margin: 2rem;
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
        <StudyTopic />
        
        
        <AdditionalStudyMaterial/>
        
      </div>
    ) : null;
    //@@viewOff:render
  },
});

export default StudyMaterial;
