//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import SubjectInfo from "../bricks/subject-info";
import Lsi from "../config/lsi";
import SubjectDescriptions from "../bricks/subject-descriptions";
import StudyMaterial from "../bricks/study-material";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Subject",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const Subject = createVisualComponent({
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
    margin: auto;
    width: 60%;
    `;
    const attrs = UU5.Common.VisualComponent.getAttrs(props, className);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    return currentNestingLevel ? (
      <div {...attrs}>
        <div>
          <UU5.Bricks.Header
            colorSchema="blue"
            content={<UU5.Bricks.Lsi lsi={Lsi.subjectDetail.subjectName} />}
            level="1"
            className="uu5-common-center font-size-xxl"
          />
          <SubjectInfo />
        </div>

        <SubjectDescriptions />
        <StudyMaterial />
      </div>
    ) : null;
    //@@viewOff:render
  },
});

export default Subject;
