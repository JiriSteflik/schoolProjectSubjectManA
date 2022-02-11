//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useState, useDataList } from "uu5g04-hooks";
import Config from "./config/config";
import Uu5Tiles from "uu5tilesg02";
import TopicAdd from "../bricks/topic-add";
import Lsi from "./topic.lsi";
import Calls from "../calls";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Topic",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const Topic = createVisualComponent({
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
    // const [formOpened, setFormOpened] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [topicToDelete, setTopicToDelete] = useState(null);

    const topicListData = useDataList({
      handlerMap: {
        load: Calls.listTopic,
        createItem: Calls.createTopic,
      },
      itemHandlerMap: {
        update: Calls.updateTopic,
        delete: Calls.deleteTopic,
      },
      initialDtoIn: {},
    });
    //@@viewOn:interface
    function handleCreateTopic(newBookData) {
      return topicListData.handlerMap.createItem(newBookData);
    }

    function handleUpdateTopic(updatedBookData) {
      return selectedTopic.handlerMap.update(updatedBookData);
    }

    function handleBookTopic() {
      return topicToDelete.handlerMap.delete({ id: topicToDelete.data.id });
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
          header: <UU5.Bricks.Lsi lsi={Lsi.description} />,
          cell: (cellProps) => cellProps.data.data.description,
        },

        {
          cell: (cellProps) => {
            return (
              <>
                <UU5.Bricks.Button
                  colorSchema="gray"
                  onClick={() => {
                    UU5.Environment.getRouter().setRoute("topicDetail", { id: cellProps.data.data.id });
                  }}
                >
                  <UU5.Bricks.Icon icon="mdi-magnify" />
                </UU5.Bricks.Button>
                <UU5.Bricks.Button colorSchema="blue" onClick={() => setSelectedTopic(cellProps.data)}>
                  <UU5.Bricks.Icon icon="mdi-pencil" />
                </UU5.Bricks.Button>
                <UU5.Bricks.Button colorSchema="red" onClick={() => setTopicToDelete(cellProps.data)}>
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
        {selectedTopic && (
          <TopicAdd
            selectedTopic={selectedTopic.data}
            setSelectedTopic={setSelectedTopic}
            handleCreateTopic={handleCreateTopic}
            handleUpdateTopic={handleUpdateTopic}
          />
        )}
        {topicToDelete && (
          <UU5.Bricks.Modal header={"Confirm Deleting Subject"} shown={true} onClose={() => setTopicToDelete(null)}>
            <div className={"center uu5-common-padding-s"}>
              <UU5.Bricks.Button onClick={() => setTopicToDelete(null)}>Refuse</UU5.Bricks.Button>{" "}
              <UU5.Bricks.Button colorSchema={"red"} onClick={handleBookTopic}>
                Confirm
              </UU5.Bricks.Button>
            </div>
          </UU5.Bricks.Modal>
        )}
        <UU5.Bricks.Container>
          <UU5.Bricks.Button colorSchema={"green"} onClick={() => setSelectedTopic({ data: {} })}>
            <UU5.Bricks.Icon icon={"mdi-plus"} />
            <UU5.Bricks.Lsi lsi={Lsi.create} />
          </UU5.Bricks.Button>
          <Uu5Tiles.List columns={getColumns()} data={topicListData.data || []} rowAlignment="center" rowHeight={150} />
        </UU5.Bricks.Container>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

export default Topic;
