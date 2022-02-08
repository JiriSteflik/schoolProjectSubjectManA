import UU5 from "uu5g04";
import { BookList } from "./book-list.js";
export * from "./book-list.js";
import { BookDetail } from "./book-detail.js";
export * from "./book-detail.js";
import { BookUpdateForm } from "./book-update-form.js";
export * from "./book-update-form.js";
import { ControlledForm } from "./controlled-form.js";
export * from "./controlled-form.js";
export default { BookList, BookDetail, BookUpdateForm, ControlledForm };

if (process.env.NODE_ENV !== "test") {
  console.log(
    `${process.env.NAME}-${process.env.VERSION} © Unicorn\nTerms of Use: https://unicorn.com/tou/${process.env.NAME}`
  );
}
UU5.Environment.addRuntimeLibrary({
  name: process.env.NAME,
  version: process.env.VERSION,
  namespace: process.env.NAMESPACE,
});
