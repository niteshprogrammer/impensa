import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";
import {Wrapper, H3, H5, ButtonContainer} from "./style"
import { Button } from "../Button";
const GeneralCategories = [
  { value: "entertainment", label: "entertainment", color: "blue" },
  { value: "investment", label: "investment", color: "red" },
  { value: "subscription", label: "subscription", color: "#36B37E" },
  { value: "travelling", label: "travelling", color: "#00875A" },
];

const ExactLabel = [
  { value: "netflix", label: "netflix", color: "blue" },
  { value: "youtube Premium", label: "youtube premium", color: "red" },
  { value: "spotify", label: "spotify", color: "#36B37E" },
  { value: "accomodation", label: "accomodation", color: "#00875A" },
  { value: "primeVideo", label: "prime Video", color: "#253858" },
  { value: "transport", label: "transport", color: "#666666" },
  { value: "groceries", label: "groceries", color: "#666666" },
];

const Categories = ({ setForm, formData, navigation }) => {
  // set value for default selection
  const [selectedValue, setSelectedValue] = useState([]);

  // handle onChange event of the dropdown
  const handleChange = (e) => {
    setSelectedValue(Array.isArray(e) ? e.map((x) => x.label) : []);
  };

  const { next } = navigation;

  return (
    <Wrapper>
    <H5>Choose category</H5>
      <CreatableSelect
        isMulti
        options={GeneralCategories}
        className="basic-multi-select"
        classNamePrefix="select"
      />
          <H5>Spent on</H5>
            <CreatableSelect
                onChange={handleChange}
        isMulti
        options={ExactLabel}
        className="basic-multi-select"
        classNamePrefix="select"
      />
      <ButtonContainer>
        <Button onClick={next}>Next</Button>
        </ButtonContainer>
        <div>
        <b>Selected Value: </b> {(selectedValue)}
        {Object.keys(selectedValue).map((keyName, i) => (
        <span className="input-label"> {selectedValue[keyName]}</span>
))}
      </div>
    </Wrapper>
  );
};

export default Categories;