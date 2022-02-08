//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useDataList } from "uu5g04-hooks";
import Config from "./config/config";
import SubjectCreate from "../bricks/subject-create";
import Lsi from "../config/lsi";
import Uu5Tiles from "uu5tilesg02";
import Calls from "../calls";
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
    const bookListData = useDataList({
      handlerMap: {
        load: Calls.listProgramme,
      },
      initialDtoIn: {},
    });
    console.log(bookListData);
    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const className = Config.Css.css``;
    const attrs = UU5.Common.VisualComponent.getAttrs(props, className);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    /* function getColumns() {
      const columnList = [
        {
          cell: (cellProps) => "test",
          header: "Name",
        },
      ];
      return columnList;
    }*/

    return currentNestingLevel ? (
      <div {...attrs}>
        <UU5.Bricks.Button colorSchema={"green"}>
          <UU5.Bricks.Icon icon={"mdi-plus"}></UU5.Bricks.Icon>
          <UU5.Bricks.Lsi lsi={Lsi.create}></UU5.Bricks.Lsi>
        </UU5.Bricks.Button>

        <SubjectCreate />
      </div>
    ) : null;
    //@@viewOff:render<Uu5Tiles.List columns={getColumns()} data={["1"]} />
  },
});

export default StudyMaterial;
