//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, } from "uu5g04-hooks";
import Config from "./config/config";
import Lsi from "./topic.lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "TopicAdd",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const TopicAdd = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    shown: UU5.PropTypes.bool,
    selectedTopic: UU5.PropTypes.object,
    setFormOpened: UU5.PropTypes.func,
    setSelectedTopic: UU5.PropTypes.func,
    handleCreateTopic: UU5.PropTypes.func,
    handleUpdateTopic: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    async function handleOnSave(opt) {
      opt.component.setPending();

      try {
        if (props.selectedTopic?.id)
          await props.handleUpdateTopic({ id: props.selectedTopic.id, ...opt.values });
        else await props.handleCreateTopic(opt.values);
        opt.component.setReady();
        props.setSelectedTopic(null);
      } catch {
        opt.component.getAlertBus().setAlert({
          content: <UU5.Bricks.Lsi lsi={Lsi.unsuccessful} />,
          colorSchema: "red",
        });
        opt.component.setReady();
      }
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const className = Config.Css.css``;
    const attrs = UU5.Common.VisualComponent.getAttrs(props, className);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    return currentNestingLevel ? (
      <div {...attrs}>
        <UU5.Bricks.Modal
          header={<UU5.Bricks.Lsi lsi={props.selectedTopic?.id ? Lsi.updateTopic : Lsi.createTopic} />}
          shown={props.selectedTopic}
          onClose={() => props.setSelectedTopic(null)}
        >
          <UU5.Forms.Form
            labelColWidth={"xs-12 s-12 m-4 l-3 xl-3"}
            valueColWidth={"xs-12 s-12 m-8 l-7 xl-7"}
            onSave={handleOnSave}
            onCancel={() => props.setSelectedTopic(null)}
          >
            <UU5.Forms.Text
              name={"name"}
              label={<UU5.Bricks.Lsi lsi={Lsi.name} />}
              value={props.selectedTopic?.name || ""}
              controlled={true}
              required
            />
            <UU5.Forms.Text
              name={"description"}
              label={<UU5.Bricks.Lsi lsi={Lsi.description} />}
              value={props.selectedTopic?.description || ""}
              controlled={true}
              required
            />
           

            <UU5.Bricks.Line size={"s"} />
            <UU5.Forms.Controls />
          </UU5.Forms.Form>
        </UU5.Bricks.Modal>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

export default TopicAdd;
