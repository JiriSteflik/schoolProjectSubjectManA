//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useState, useDataList } from "uu5g04-hooks";
import Uu5Tiles from "uu5tilesg02";
import Config from "./config/config";
import SubjectUpdateForm from "./subject-update-form";
import Lsi from "./subject.lsi";
import TopicDetail from "./topic-detail";
import withDataList from "../bricks/with-data-list";
import Calls from "../calls";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "SubjectList",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const SubjectList = withDataList(
  createVisualComponent({
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
      const topicAvailableTags = [];

      if (props.data) {
        props.data.forEach((topic) => {
          topicAvailableTags.push({
            value: topic.data.id,
            content: topic.data.name,
          });
        });
      }
      //@@viewOff:private

      //@@viewOn:interface
      function handleCreateSubject(newTopicData) {
        return subjectListData.handlerMap.createItem(newTopicData);
      }

      function handleUpdateSubject(updatedTopicData) {
        return selectedSubject.handlerMap.update(updatedTopicData);
      }

      function handleTopicDelete() {
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
          /*{
            header: "Topic",
            cell: (cellProps) => {
              let topicComponentList = [];
              cellProps.data.data.topic.forEach((topic) => {
                topicComponentList.push(
                  <div key={topic}>
                    <TopicDetail topicId={topic} nestingLevel={"inline"} />
                    <br />
                  </div>
                );
              });
              return <>{topicComponentList}</>;
            },
          },*/

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

      const Filters = [
        {
          key: "name",
          label: { cs: "Název", en: "Name" },
          filterFn: (item, value) => {
            return item.data.name.toLowerCase().includes(value.toLowerCase());
          },
        },
        {
          key: "name2",
          label: { cs: "Autor", en: "Author" },
          filterFn: (item, value) => {
            return item.data.topic.includes(value[0]);
          },
          component: (
            <UU5.Forms.TagSelect
              name={"topic"}
              label={<UU5.Bricks.Lsi lsi={Lsi.topic} />}
              availableTags={topicAvailableTags}
              multiple={false}
              required={true}
              controlled={true}
            />
          ),
          getValueLabel: (value) => {
            let topicObject = topicAvailableTags.find((topicOption) => topicOption.value === value[0]);
            return topicObject.content;
          },
        },
      ];

      let Sorters = [
        {
          key: "nameAsc",
          label: { cs: "Název", en: "Name" },
          sorterFn: (a, b) => {
            return a.data.name.localeCompare(b.data.name);
          },
        },
        {
          key: "nameDsc",
          label: { cs: "Název", en: "Name" },
          ascending: false,
          sorterFn: (a, b) => {
            return a.data.name.localeCompare(b.data.name);
          },
        },
      ];

      return currentNestingLevel ? (
        <div {...attrs}>
          {selectedSubject && (
            <UU5.Bricks.Modal
              header={<UU5.Bricks.Lsi lsi={props.selectedSubject?.id ? Lsi.updateSubject : Lsi.createSubject} />}
              shown={!!selectedSubject}
              onClose={() => setSelectedSubject(null)}
            >
              <SubjectUpdateForm
                selectedSubject={selectedSubject.data}
                setSelectedSubject={setSelectedSubject}
                handleCreateSubject={handleCreateSubject}
                handleUpdateSubject={handleUpdateSubject}
              />
            </UU5.Bricks.Modal>
          )}
          {subjectToDelete && (
            <UU5.Bricks.Modal header={"Confirm Deleting Subject"} shown={true} onClose={() => setSubjectToDelete(null)}>
              <div className={"center uu5-common-padding-s"}>
                <UU5.Bricks.Button onClick={() => setSubjectToDelete(null)}>Refuse</UU5.Bricks.Button>{" "}
                <UU5.Bricks.Button colorSchema={"red"} onClick={handleTopicDelete}>
                  Confirm
                </UU5.Bricks.Button>
              </div>
            </UU5.Bricks.Modal>
          )}
          <UU5.Bricks.Container>
            <Uu5Tiles.ControllerProvider data={subjectListData.data || []} filters={Filters} sorters={Sorters}>
              <Uu5Tiles.ActionBar
                searchable={true}
                actions={[
                  {
                    onClick: () => setSelectedSubject({ data: {} }),
                    icon: "mdi-plus",
                    content: Lsi.create,
                    colorSchema: "green",
                    active: true,
                    bgStyle: "filled",
                  },
                ]}
              />
              <Uu5Tiles.FilterBar />
              <Uu5Tiles.InfoBar sortable={false} />
              <Uu5Tiles.List columns={getColumns()} rowAlignment="center" rowHeight={150} />
            </Uu5Tiles.ControllerProvider>
          </UU5.Bricks.Container>
        </div>
      ) : null;
      //@@viewOff:render
    },
  })
);

export default SubjectList;
