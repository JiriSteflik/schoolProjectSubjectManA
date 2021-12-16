import UU5 from "uu5g04";
import UuSubjectmanx from "uu_subjectmanx_maing01-hi";

const { shallow } = UU5.Test.Tools;

describe(`UuSubjectmanx.Routes.StudyProgramme`, () => {
  it(`default props`, () => {
    const wrapper = shallow(<UuSubjectmanx.Routes.StudyProgramme />);
    expect(wrapper).toMatchSnapshot();
  });
});
