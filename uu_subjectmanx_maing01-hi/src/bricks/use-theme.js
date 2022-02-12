//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useContext } from "uu5g04-hooks";
import ThemeContext from "./theme-context";

//@@viewOff:imports
export function useThemeContext() {
  return useContext(ThemeContext);
}

export default UseTheme;
