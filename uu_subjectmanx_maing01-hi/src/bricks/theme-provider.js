//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useState } from "uu5g04-hooks";
import ThemeContext from "./theme-context";
import Config from "./config/config";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "ThemeProvider",
  //@@viewOff:statics
};

export const ThemeProvider = createComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [theme, setTheme] = useState();
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render

    return (
      <ThemeContext.Provider value={{ theme: theme, handlerMap: setTheme }}>{props.children()}</ThemeContext.Provider>
    );
  },
});

export default ThemeProvider;
