//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useState, useDataList } from "uu5g04-hooks";
import Uu5Tiles from "uu5tilesg02";
import Config from "./config/config";
import Study from "../bricks/study";
import Lsi from "./subject.lsi";
import Calls from "../calls";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "ProgrammeList",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const ProgrammeList = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    // const [formOpened, setFormOpened] = useState(false);
    const [selectedProgramme, setSelectedProgramme] = useState(null);
    const [programmeToDelete, setProgrammeToDelete] = useState(null);

    const programmeListData = useDataList({
      handlerMap: {
        load: Calls.listProgramme,
        createItem: Calls.createProgramme,
      },
      itemHandlerMap: {
        update: Calls.updateProgramme,
        delete: Calls.deleteProgramme,
      },
      initialDtoIn: {},
    });
    //console.log(programmeListData);

    //@@viewOff:private

    //@@viewOn:interface
    function handleCreateProgramme(newBookData) {
      return programmeListData.handlerMap.createItem(newBookData);
    }

    function handleUpdateProgramme(updatedBookData) {
      return selectedProgramme.handlerMap.update(updatedBookData);
    }

    function handleBookProgramme() {
      return programmeToDelete.handlerMap.delete({ id: programmeToDelete.data.id });
    }
    //@@viewOff:interface

    //@@viewOn:render
    const className = Config.Css.css``;
    const attrs = UU5.Common.VisualComponent.getAttrs(props, className);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    function getColumns() {
      return [
        {
          header: <UU5.Bricks.Lsi lsi={Lsi.name} />,
          cell: (cellProps) => cellProps.data.data.name,
        },

        {
          header: <UU5.Bricks.Lsi lsi={Lsi.teacher} />,
          cell: (cellProps) => cellProps.data.data.garant,
        },
        {
          header: <UU5.Bricks.Lsi lsi={Lsi.credit} />,
          cell: (cellProps) => cellProps.data.data.description,
        },
        {
          cell: (cellProps) => {
            return (
              <>
                <UU5.Bricks.Button
                  colorSchema="gray"
                  onClick={() => {
                    UU5.Environment.getRouter().setRoute("programmeDetail", { id: cellProps.data.data.id });
                  }}
                >
                  <UU5.Bricks.Icon icon="mdi-magnify" />
                </UU5.Bricks.Button>
                <UU5.Bricks.Button colorSchema="blue" onClick={() => setSelectedProgramme(cellProps.data)}>
                  <UU5.Bricks.Icon icon="mdi-pencil" />
                </UU5.Bricks.Button>
                <UU5.Bricks.Button colorSchema="red" onClick={() => setProgrammeToDelete(cellProps.data)}>
                  <UU5.Bricks.Icon icon="mdi-close" />
                </UU5.Bricks.Button>
              </>
            );
          },
        },
      ];
    }
    
    return currentNestingLevel ? (
      <div {...attrs}>
        {selectedProgramme && (
          <Study
            selectedProgramme={selectedProgramme.data}
            setSelectedProgramme={setSelectedProgramme}
            handleCreateProgramme={handleCreateProgramme}
            handleUpdateProgramme={handleUpdateProgramme}
          />
        )}
        {programmeToDelete && (
          <UU5.Bricks.Modal header={"Confirm Deleting Subject"} shown={true} onClose={() => setProgrammeToDelete(null)}>
            <div className={"center uu5-common-padding-s"}>
              <UU5.Bricks.Button onClick={() => setProgrammeToDelete(null)}>Refuse</UU5.Bricks.Button>{" "}
              <UU5.Bricks.Button colorSchema={"red"} onClick={handleBookProgramme}>
                Confirm
              </UU5.Bricks.Button>
            </div>
          </UU5.Bricks.Modal>
        )}
        <UU5.Bricks.Container>
          <UU5.Bricks.Button colorSchema={"green"} onClick={() => setSelectedProgramme({ data: {} })}>
            <UU5.Bricks.Icon icon={"mdi-plus"} />
            <UU5.Bricks.Lsi lsi={Lsi.create} />
          </UU5.Bricks.Button>
          <Uu5Tiles.List
            columns={getColumns()}
            data={programmeListData.data || []}
            rowAlignment="center"
            rowHeight={150}
          />
        </UU5.Bricks.Container>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

export default ProgrammeList;
