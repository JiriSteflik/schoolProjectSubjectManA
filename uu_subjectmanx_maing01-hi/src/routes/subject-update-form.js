//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import Lsi from "./subject.lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "SubjectUpdateForm",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const SubjectUpdateForm = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    shown: UU5.PropTypes.bool,
    selectedSubject: UU5.PropTypes.object,
    setFormOpened: UU5.PropTypes.func,
    setSelectedSubject: UU5.PropTypes.func,
    handleCreateSubject: UU5.PropTypes.func,
    handleUpdateSubject: UU5.PropTypes.func,
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
        if (props.selectedSubject?.id) await props.handleUpdateSubject({ id: props.selectedSubject.id, ...opt.values });
        else await props.handleCreateSubject(opt.values);
        opt.component.setReady();
        props.setSelectedSubject(null);
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
          header={<UU5.Bricks.Lsi lsi={props.selectedSubject?.id ? Lsi.updateBook : Lsi.createBook} />}
          shown={props.selectedSubject}
          onClose={() => props.setSelectedSubject(null)}
        >
          <UU5.Forms.Form
            labelColWidth={"xs-12 s-12 m-4 l-3 xl-3"}
            valueColWidth={"xs-12 s-12 m-8 l-7 xl-7"}
            onSave={handleOnSave}
            onCancel={() => props.setSelectedSubject(null)}
          >
            <UU5.Forms.Text
              name={"name"}
              label={<UU5.Bricks.Lsi lsi={Lsi.name} />}
              value={props.selectedSubject?.name || ""}
              controlled={true}
              required
            />
            <UU5.Forms.Text
              name={"teacher"}
              label={<UU5.Bricks.Lsi lsi={Lsi.teacher} />}
              value={props.selectedSubject?.teacher || ""}
              controlled={true}
              required
            />
            <UU5.Forms.Text
              name={"credit"}
              label={<UU5.Bricks.Lsi lsi={Lsi.credit} />}
              value={props.selectedSubject?.credit || ""}
              controlled={true}
              required
            />
            <UU5.Forms.Text
              label={<UU5.Bricks.Lsi lsi={Lsi.requirement} />}
              name="requirement"
              value={props.selectedSubject?.requirement || ""}
              inputAttrs={{ maxLength: 255 }}
              controlled={true}
            />
            <UU5.Forms.Text
              label={<UU5.Bricks.Lsi lsi={Lsi.description} />}
              name="description"
              value={props.selectedSubject?.description || ""}
              inputAttrs={{ maxLength: 255 }}
              controlled={true}
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

export default SubjectUpdateForm;
