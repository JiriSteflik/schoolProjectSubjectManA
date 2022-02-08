//@@viewOn:imports
import UU5, { PropTypes } from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "BookDetail",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const BookDetail = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    name: PropTypes.string,
    author: PropTypes.string,
    cover: PropTypes.string
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const className = Config.Css.css``;
    const attrs = UU5.Common.VisualComponent.getAttrs(props, className);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(
      props,
      STATICS
    );

    return currentNestingLevel ? (
      <div {...attrs}>
        <UU5.Bricks.Column colWidth="xs-12 s-12 m-6 l-4 xl-3">
          <UU5.Bricks.Card colorSchema="blue">
            <b>{props.name}</b>
            <div>{props.author}</div>
            <img src={props.cover} />
          </UU5.Bricks.Card>
        </UU5.Bricks.Column>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

export default BookDetail;
