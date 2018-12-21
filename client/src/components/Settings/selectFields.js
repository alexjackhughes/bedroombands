import React from "react";
import Select from "react-select";

const SelectFields = props => (
  <Select
    value={this.props.value}
    className="input-field"
    onChange={this.props.handleOnChange}
    options={this.props.options}
    isMulti={true}
  />
);

export default SelectFields;
