//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useState } from "uu5g04-hooks";
import Config from "./config/config";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "ControlledForm",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const ControlledForm = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [selectedRegion, setSelectedRegion] = useState();
    const [selectedCity, setSelectedCity] = useState();
    const [selectedStreet, setSelectedStreet] = useState();

    const regionList = [
      { id: "STR", name: "Středočeský" },
      { id: "PAR", name: "Pardubický" },
      { id: "SEM", name: "Severomoravský" },
    ];
    const cityList = [
      { id: "KOL", name: "Kolín", region: "STR" },
      { id: "PAR", name: "Pardubice", region: "PAR" },
      { id: "OPA", name: "Opatovice", region: "PAR" },
      { id: "OST", name: "Ostrava", region: "SEM" },
      { id: "FM", name: "Frýden-Místek", region: "SEM" },
    ];
    const streetList = [
      { id: "REV", name: "Revoluční", city: "FM" },
      { id: "LES", name: "Lesní", city: "OST" },
      { id: "VOD", name: "Vodní", city: "PAR" },
      { id: "PRA", name: "Pražská", city: "KOL" },
      { id: "ELE", name: "Elektrárenská", city: "OPA" },
    ];
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const className = Config.Css.css``;
    const attrs = UU5.Common.VisualComponent.getAttrs(props, className);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    function getRegionOptionList() {
      const optionList = [];
      regionList.forEach((region) =>
        optionList.push(<UU5.Forms.Select.Option value={region.id} content={region.name} />)
      );
      return optionList;
    }

    function getCityOptionList() {
      const optionList = [];
      if (selectedRegion) {
        cityList.forEach(
          (city) =>
            selectedRegion === city.region &&
            optionList.push(<UU5.Forms.Select.Option value={city.id} content={city.name} />)
        );
      }
      return optionList;
    }

    function getStreetOptionList() {
      const optionList = [];
      if (selectedCity) {
        streetList.forEach(
          (street) =>
            selectedCity === street.city &&
            optionList.push(<UU5.Forms.Select.Option value={street.id} content={street.name} />)
        );
      }
      return optionList;
    }

    return currentNestingLevel ? (
      <div {...attrs}>
        <UU5.Forms.Select value={selectedRegion} onChange={(opt) => setSelectedRegion(opt.value)}>
          {getRegionOptionList()}
        </UU5.Forms.Select>
        <UU5.Forms.Select value={selectedCity} onChange={(opt) => setSelectedCity(opt.value)}>
          {getCityOptionList()}
        </UU5.Forms.Select>
        <UU5.Forms.Select value={selectedStreet} onChange={(opt) => setSelectedStreet(opt.value)}>
          {getStreetOptionList()}
        </UU5.Forms.Select>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

export default ControlledForm;
