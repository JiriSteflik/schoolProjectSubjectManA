//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useDataObject } from "uu5g04-hooks";
import Calls from "../calls";
import Config from "./config/config";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "ProgrammeDetail",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const ProgrammeDetail = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    const programmeData = useDataObject({
      handlerMap: {
        load: Calls.getProgramme,
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
      if (programmeData.state.includes("pending")) {
        result = <UU5.Bricks.Loading />;
      } else if (programmeData.state.includes("error")) {
        result = <UU5.Common.Error errorData={programmeData.errorData} />;
      } else {
        result = (
          <div>
            <UU5.Bricks.Container>
              <UU5.Bricks.Card colorSchema="blue">
                <b>{programmeData.data.name}</b>
                <div>{programmeData.data.garant}</div>
                <div>{programmeData.data.description}</div>
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

export default ProgrammeDetail;
