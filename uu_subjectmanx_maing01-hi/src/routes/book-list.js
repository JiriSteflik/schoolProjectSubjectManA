//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useState, useDataList } from "uu5g04-hooks";
import Uu5Tiles from "uu5tilesg02";
import Config from "./config/config";
import BookUpdateForm from "./book-update-form";
import Lsi from "./book-lsi";
import Calls from "../calls";
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
    // const [formOpened, setFormOpened] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [bookToDelete, setBookToDelete] = useState(null);
    const bookListData = useDataList({
      handlerMap: {
        load: Calls.listProgramme,
      },
      initialDtoIn: {},
    });
    console.log(bookListData)
    const [bookList, setBookList] = useState([
      {
        id: "12345666",
        name: "20 000 mil pod mořem",
        date: "2021-12-01T00:30:40Z",
        author: "Jules Verne",
        cover:
          "https://www.knihydobrovsky.cz/thumbs/book-detail/mod_eshop/produkty/2/20-000-mil-pod-morem-9788024733883.jpg.webp",
      },
      {
        id: "12345667",
        name: "Vinnetou I",
        author: "Karel May",
        cover:
          "https://www.knihydobrovsky.cz/thumbs/book-detail/mod_eshop/produkty/v/vinnetou-i-indianske-leto-9788072641543.jpg.webp",
      },
    ]);
    //@@viewOff:private

    //@@viewOn:interface
    function handleCreateBook(newBookData) {
      const newBookList = bookList.slice();
      const bookId = new Date().toISOString();
      newBookList.push({ id: bookId, ...newBookData });
      setBookList(newBookList);
      setSelectedBook(null);
    }

    function handleUpdateBook(updatedBookData) {
      const newBookList = bookList.slice();
      const bookIndex = newBookList.findIndex((book) => book.id === updatedBookData.id);
      newBookList[bookIndex] = updatedBookData;
      return new Promise((resolve, reject) =>
        setTimeout(() => {
          if (updatedBookData.author.includes("Vernes")) reject(false);
          else resolve(true);
          setBookList(newBookList);
        }, 1000)
      );
    }

    function handleBookDelete() {
      const newBookList = bookList.slice();
      const bookIndex = newBookList.findIndex((book) => book.id === bookToDelete.id);
      newBookList.splice(bookIndex, 1);
      setBookList(newBookList);
      setBookToDelete(null);
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
          cell: (cellProps) => cellProps.data.name,
        },
        {
          header: <UU5.Bricks.Lsi lsi={Lsi.date} />,
          cell: (cellProps) => {
            if (cellProps.data.date) {
              return new Date(cellProps.data.date).toLocaleString(UU5.Common.Tools.getLanguage());
            } else {
              return "";
            }
          },
        },
        {
          header: "Author",
          cell: (cellProps) => cellProps.data.author,
        },
        {
          header: "Cover",
          cell: (cellProps) => <UU5.Bricks.Image height="100px" src={cellProps.data.cover} />,
        },
        {
          cell: (cellProps) => {
            return (
              <>
                {/*<UU5.Bricks.Button colorSchema="blue" onClick={() => setFormOpened(true)}><UU5.Bricks.Icon icon="mdi-pencil" /></UU5.Bricks.Button>*/}
                <UU5.Bricks.Button colorSchema="blue" onClick={() => setSelectedBook(cellProps.data)}>
                  <UU5.Bricks.Icon icon="mdi-pencil" />
                </UU5.Bricks.Button>
                <UU5.Bricks.Button colorSchema="red" onClick={() => setBookToDelete(cellProps.data)}>
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
        {selectedBook && (
          <BookUpdateForm
            // shown={formOpened}
            // setFormOpened={setFormOpened}
            selectedBook={selectedBook}
            setSelectedBook={setSelectedBook}
            handleCreateBook={handleCreateBook}
            handleUpdateBook={handleUpdateBook}
          />
        )}
        <UU5.Bricks.Modal header={"Confirm Deleting Book"} shown={bookToDelete} onClose={() => setBookToDelete(null)}>
          <div className={"center uu5-common-padding-s"}>
            <UU5.Bricks.Button onClick={() => setBookToDelete(null)}>Refuse</UU5.Bricks.Button>{" "}
            <UU5.Bricks.Button colorSchema={"red"} onClick={handleBookDelete}>
              Confirm
            </UU5.Bricks.Button>
          </div>
        </UU5.Bricks.Modal>
        <UU5.Bricks.Button colorSchema={"green"} onClick={() => setSelectedBook({})}>
          <UU5.Bricks.Icon icon={"mdi-plus"} />
          <UU5.Bricks.Lsi lsi={Lsi.create} />
        </UU5.Bricks.Button>
        <Uu5Tiles.List columns={getColumns()} data={bookList} rowAlignment="center" rowHeight={150} />
      </div>
    ) : null;
    //@@viewOff:render
  },
});

export default BookList;
