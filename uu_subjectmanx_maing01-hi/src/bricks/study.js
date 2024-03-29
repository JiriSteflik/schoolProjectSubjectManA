//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import Lsi from "./programe-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "ProgrammectUpdateForm",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const ProgrammectUpdateForm = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    shown: UU5.PropTypes.bool,
    selectedProgramme: UU5.PropTypes.object,
    setFormOpened: UU5.PropTypes.func,
    setSelectedProgramme: UU5.PropTypes.func,
    handleCreateProgramme: UU5.PropTypes.func,
    handleUpdateProgramme: UU5.PropTypes.func,
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
        if (props.selectedProgramme?.id) await props.handleUpdateProgramme({ id: props.selectedProgramme.id, ...opt.values });
        else await props.handleCreateProgramme(opt.values);
        opt.component.setReady();
        props.setSelectedProgramme(null);
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
          header={<UU5.Bricks.Lsi lsi={props.selectedProgramme?.id ? Lsi.updateProgramme : Lsi.createProgramme} />}
          shown={props.selectedProgramme}
          onClose={() => props.setSelectedProgramme(null)}
        >
          <UU5.Forms.Form
            labelColWidth={"xs-12 s-12 m-4 l-3 xl-3"}
            valueColWidth={"xs-12 s-12 m-8 l-7 xl-7"}
            onSave={handleOnSave}
            onCancel={() => props.setSelectedProgramme(null)}
          >
            <UU5.Forms.Text
              name={"name"}
              label={<UU5.Bricks.Lsi lsi={Lsi.name} />}
              value={props.selectedProgramme?.name || ""}
              controlled={true}
              required
            />
            <UU5.Forms.Text
              name={"garant"}
              label={<UU5.Bricks.Lsi lsi={Lsi.garant} />}
              value={props.selectedProgramme?.garant || ""}
              controlled={true}
              required
            />
            <UU5.Forms.Text
              name={"description"}
              label={<UU5.Bricks.Lsi lsi={Lsi.description} />}
              value={props.selectedProgramme?.description || ""}
              controlled={true}
              required
            />
            <UU5.Forms.Select
              name={"degree"}
              label={<UU5.Bricks.Lsi lsi={Lsi.degree} />}
              value={props.selectedProgramme?.degree || ""}
              controlled={true}
              required
            >
              <UU5.Forms.Select.Option value="bachelor" content={<UU5.Bricks.Lsi lsi={Lsi.degree.bachelor} />} />
              <UU5.Forms.Select.Option value="magister" content={<UU5.Bricks.Lsi lsi={Lsi.degree.magister} />} />
            </UU5.Forms.Select>

            <UU5.Forms.Select
              name={"forms"}
              label={<UU5.Bricks.Lsi lsi={Lsi.forms} />}
              value={props.selectedProgramme?.forms || ""}
              controlled={true}
              required
            >
              <UU5.Forms.Select.Option value="full-time" content={<UU5.Bricks.Lsi lsi={Lsi.forms.fullTime} />} />
              <UU5.Forms.Select.Option value="part-time" content={<UU5.Bricks.Lsi lsi={Lsi.forms.partTime} />} />
            </UU5.Forms.Select>

            <UU5.Forms.Select
              name={"language"}
              label={<UU5.Bricks.Lsi lsi={Lsi.language} />}
              value={props.selectedProgramme?.language || ""}
              controlled={true}
              required
            >
              <UU5.Forms.Select.Option value="CZ" content={<UU5.Bricks.Lsi lsi={Lsi.language.czech} />} />
              <UU5.Forms.Select.Option value="EN" content={<UU5.Bricks.Lsi lsi={Lsi.language.english} />} />
            </UU5.Forms.Select>

            <UU5.Bricks.Line size={"s"} />
            <UU5.Forms.Controls />
          </UU5.Forms.Form>
        </UU5.Bricks.Modal>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

export default ProgrammectUpdateForm;
