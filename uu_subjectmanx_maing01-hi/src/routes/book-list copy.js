//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import BookDetail from "./book-detail";
import Config from "./config/config";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "BookList",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const BookList = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const bookList = [
      {
        name: "20 000 mil pod mořem",
        author: "Jules Verne",
        cover: "https://www.knihydobrovsky.cz/thumbs/book-detail/mod_eshop/produkty/2/20-000-mil-pod-morem-9788024733883.jpg.webp"
      },
      {
        name: "Vinnetou I",
        author: "Karel May",
        cover: "https://www.knihydobrovsky.cz/thumbs/book-detail/mod_eshop/produkty/v/vinnetou-i-indianske-leto-9788072641543.jpg.webp"
      },
      {
        name: "Vinnetou I",
        author: "Karel May",
        cover: "https://www.knihydobrovsky.cz/thumbs/book-detail/mod_eshop/produkty/v/vinnetou-i-indianske-leto-9788072641543.jpg.webp"
      },
      {
        name: "Vinnetou I",
        author: "Karel May",
        cover: "https://www.knihydobrovsky.cz/thumbs/book-detail/mod_eshop/produkty/v/vinnetou-i-indianske-leto-9788072641543.jpg.webp"
      }
    ]
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

    function getBookComponentList() {
      const bookComponentList = [];
      bookList.forEach(book => {
        bookComponentList.push(<BookDetail
          name={book.name}
          author={book.author}
          cover={book.cover}
        />)
      })
      return bookComponentList;
    }

    return currentNestingLevel ? (
      <div {...attrs}>
        <UU5.Bricks.Row>
          {getBookComponentList()}
        </UU5.Bricks.Row>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

export default BookList;
