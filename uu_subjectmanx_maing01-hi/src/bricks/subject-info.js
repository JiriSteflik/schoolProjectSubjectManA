//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useScreenSize, useDataList } from "uu5g04-hooks";
import Config from "./config/config";
import Uu5Tiles from "uu5tilesg02";
import Calls from "../calls";
//import Lsi from "../config/lsi";
import Lsi from "../routes/subject.lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "SubjectInfo",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const SubjectInfo = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    const subjectDataList = useDataList({
      handlerMap: {
        load: Calls.listSubject,
      },
    });

    const screenSize = useScreenSize();
    //@@viewOn:private
    //@@viewOff:private
    const subjectInformation = [
      {
        name: "Neco pod morem",
        autor: "Julius verne",
      },
      {
        name: "Vsechno nad morem",
        autor: "Zaba Obri",
      },
    ];
    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const className = Config.Css.css`
    text-align:center;
    box-shadow: 5px 10px 18px #5589e6;
    padding: 5rem;
    margin: 3rem;
    
    float: center;
    border: 4px solid 5589e6;
    border-radius: 25px;
    `;

    const attrs = UU5.Common.VisualComponent.getAttrs(props, className, screenSize);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);
    function getSubjectList() {}

    return (
      <UU5.Bricks.Container {...attrs}>
        <Uu5Tiles.List
          data={[
            {
              info: <UU5.Bricks.Lsi lsi={Lsi.subjectInformation.credits} />,
              data: 9,
            },
            {
              info: <UU5.Bricks.Lsi lsi={Lsi.subjectInformation.teacher} />,
              data: <UU5.Bricks.Lsi lsi={Lsi.subjectInformation.teacherName} />,
            },
            {
              info: <UU5.Bricks.Lsi lsi={Lsi.subjectInformation.goal} />,
              data: <UU5.Bricks.Lsi lsi={Lsi.subjectInformation.goalTarget} />,
            },
            {
              info: <UU5.Bricks.Lsi lsi={Lsi.subjectInformation.degree} />,
              data: <UU5.Bricks.Lsi lsi={Lsi.subjectInformation.degreeType} />,
            },
            {
              info: <UU5.Bricks.Lsi lsi={Lsi.subjectInformation.language} />,
              data: <UU5.Bricks.Lsi lsi={Lsi.subjectInformation.languageType} />,
            },
          ]}
          columns={[
            {
              key: "firstName",
              cell: (cellProps) => cellProps.data.info,
              header: "",
            },
            {
              key: "age",
              cell: (cellProps) => cellProps.data.data,
              header: "",
            },
          ]}
        />
      </UU5.Bricks.Container>
    );
    //@@viewOff:render
  },
});

export default SubjectInfo;
