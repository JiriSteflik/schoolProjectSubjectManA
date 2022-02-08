//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import Lsi from "./subject-create-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "SubjectCreate",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const SubjectCreate = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    subject: UU5.PropTypes.object,
    onSave: UU5.PropTypes.func,
    onSaveDone: UU5.PropTypes.func,
    onSaveFail: UU5.PropTypes.func,
    onCancel: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    subject: null,
    onSave: () => {},
    onSaveDone: () => {},
    onSaveFail: () => {},
    onCancel: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const className = Config.Css.css``;
    const attrs = UU5.Common.VisualComponent.getAttrs(props, className);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    return currentNestingLevel ? (
      <div {...attrs}>
        <UU5.Forms.Form
          onSave={props.onSave}
          onSaveDone={props.onSaveDone}
          onSaveFail={props.onSaveFail}
          onCancel={props.onCancel}
          labelColWidth={"xs-12 s-12 m-4 l-3 xl-3"}
          valueColWidth={"xs-12 s-12 m-8 l-7 xl-7"}
          controlled={true}
        >
          <UU5.Forms.Text
            name={"name"}
            required={true}
            label={<UU5.Bricks.Lsi lsi={Lsi.form.name} />}
            value={props.selectedBook?.name || ""}
            controlled={true}
          />
          <UU5.Forms.Text
            label={<UU5.Bricks.Lsi lsi={Lsi.form.teacher} />}
            name="teacher"
            value={props?.subject ? props?.subject.goal : undefined}
            inputAttrs={{ maxLength: 255 }}
            controlled={false}
            required
          />
          <UU5.Forms.Number
            label={<UU5.Bricks.Lsi lsi={Lsi.form.credit} />}
            name="credit"
            value={props?.subject ? props?.subject.credits : undefined}
            min={0}
            max={300}
            step={1}
            valueType="number"
            required
          />
          <UU5.Forms.Select
            label={<UU5.Bricks.Lsi lsi={Lsi.form.language} />}
            name="language"
            value={props?.subject ? props?.subject.language : undefined}
            required
          >
            <UU5.Forms.Select.Option value="CZ" content={<UU5.Bricks.Lsi lsi={Lsi.form.language.czech} />} />
            <UU5.Forms.Select.Option value="EN" content={<UU5.Bricks.Lsi lsi={Lsi.form.language.english} />} />
          </UU5.Forms.Select>
          <UU5.Forms.Text
            label={<UU5.Bricks.Lsi lsi={Lsi.form.requirement} />}
            name="requirement"
            value={props?.subject ? props?.subject.requirement : undefined}
            inputAttrs={{ maxLength: 255 }}
            controlled={false}
            required
          />
          <UU5.Forms.Text
            label={<UU5.Bricks.Lsi lsi={Lsi.form.description} />}
            name="description"
            value={props?.subject ? props?.subject.description : undefined}
            inputAttrs={{ maxLength: 255 }}
            controlled={false}
            required
          />
        </UU5.Forms.Form>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

export default SubjectCreate;
