//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import Lsi from "./book-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "BookUpdateForm",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const BookUpdateForm = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    shown: UU5.PropTypes.bool,
    selectedBook: UU5.PropTypes.object,
    setFormOpened: UU5.PropTypes.func,
    setSelectedBook: UU5.PropTypes.func,
    handleCreateBook: UU5.PropTypes.func,
    handleUpdateBook: UU5.PropTypes.func,
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
        if (props.selectedBook?.id) await props.handleUpdateBook({ id: props.selectedBook.id, ...opt.values });
        else await props.handleCreateBook(opt.values);
        opt.component.setReady();
        props.setSelectedBook(null);
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
          header={<UU5.Bricks.Lsi lsi={props.selectedBook?.id ? Lsi.updateBook : Lsi.createBook} />}
          shown={props.selectedBook}
          onClose={() => props.setSelectedBook(null)}
        >
          <UU5.Forms.Form
            labelColWidth={"xs-12 s-12 m-4 l-3 xl-3"}
            valueColWidth={"xs-12 s-12 m-8 l-7 xl-7"}
            onSave={handleOnSave}
            onCancel={() => props.setSelectedBook(null)}
          >
            <UU5.Forms.Text
              name={"name"}
              label={<UU5.Bricks.Lsi lsi={Lsi.name} />}
              value={props.selectedBook?.name || ""}
              controlled={false}
            />
            <UU5.Forms.Text
              name={"author"}
              label={"Author"}
              value={props.selectedBook?.author || ""}
              controlled={false}
            />
            <UU5.Forms.Text name={"cover"} label={"Cover"} value={props.selectedBook?.cover || ""} controlled={false} />
            <UU5.Bricks.Line size={"s"} />
            <UU5.Forms.Controls />
          </UU5.Forms.Form>
        </UU5.Bricks.Modal>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

export default BookUpdateForm;
