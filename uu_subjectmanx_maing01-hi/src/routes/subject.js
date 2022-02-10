//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useState, useDataList } from "uu5g04-hooks";
import Uu5Tiles from "uu5tilesg02";
import Config from "./config/config";
import BookUpdateForm from "./subject-update-form";
import Lsi from "./subject.lsi";
import Calls from "../calls";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "SubjectList",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const SubjectList = createVisualComponent({
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
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [subjectToDelete, setSubjectToDelete] = useState(null);

    const subjectListData = useDataList({
      handlerMap: {
        load: Calls.listSubject,
        createItem: Calls.createSubject,
      },
      itemHandlerMap: {
        update: Calls.updateSubject,
        delete: Calls.deleteSubject,
      },
      initialDtoIn: {},
    });
    //console.log(subjectListData);

    //@@viewOff:private

    //@@viewOn:interface
    function handleCreateSubject(newBookData) {
      return subjectListData.handlerMap.createItem(newBookData);
    }

    function handleUpdateSubject(updatedBookData) {
      return selectedSubject.handlerMap.update(updatedBookData);
    }

    function handleBookDelete() {
      return subjectToDelete.handlerMap.delete({ id: subjectToDelete.data.id });
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
          cell: (cellProps) => cellProps.data.data.teacher,
        },
        {
          header: <UU5.Bricks.Lsi lsi={Lsi.credit} />,
          cell: (cellProps) => cellProps.data.data.credit,
        },
        {
          cell: (cellProps) => {
            return (
              <>
                <UU5.Bricks.Button
                  colorSchema="gray"
                  onClick={() => {
                    UU5.Environment.getRouter().setRoute("subjectDetail", { id: cellProps.data.data.id });
                  }}
                >
                  <UU5.Bricks.Icon icon="mdi-magnify" />
                </UU5.Bricks.Button>
                <UU5.Bricks.Button colorSchema="blue" onClick={() => setSelectedSubject(cellProps.data)}>
                  <UU5.Bricks.Icon icon="mdi-pencil" />
                </UU5.Bricks.Button>
                <UU5.Bricks.Button colorSchema="red" onClick={() => setSubjectToDelete(cellProps.data)}>
                  <UU5.Bricks.Icon icon="mdi-close" />
                </UU5.Bricks.Button>
              </>
            );
          },
        },
      ];
    }
    console.log(selectedSubject);
    return currentNestingLevel ? (
      <div {...attrs}>
        {selectedSubject && (
          <BookUpdateForm
            selectedSubject={selectedSubject.data}
            setSelectedSubject={setSelectedSubject}
            handleCreateSubject={handleCreateSubject}
            handleUpdateSubject={handleUpdateSubject}
          />
        )}
        {subjectToDelete && (
          <UU5.Bricks.Modal header={"Confirm Deleting Subject"} shown={true} onClose={() => setSubjectToDelete(null)}>
            <div className={"center uu5-common-padding-s"}>
              <UU5.Bricks.Button onClick={() => setSubjectToDelete(null)}>Refuse</UU5.Bricks.Button>{" "}
              <UU5.Bricks.Button colorSchema={"red"} onClick={handleBookDelete}>
                Confirm
              </UU5.Bricks.Button>
            </div>
          </UU5.Bricks.Modal>
        )}
        <UU5.Bricks.Container>
          <UU5.Bricks.Button colorSchema={"green"} onClick={() => setSelectedSubject({ data: {} })}>
            <UU5.Bricks.Icon icon={"mdi-plus"} />
            <UU5.Bricks.Lsi lsi={Lsi.create} />
          </UU5.Bricks.Button>
          <Uu5Tiles.List
            columns={getColumns()}
            data={subjectListData.data || []}
            rowAlignment="center"
            rowHeight={150}
          />
          
        </UU5.Bricks.Container>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

export default SubjectList;
