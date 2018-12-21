import React from "react";
import Select from "react-select";

export default props => (
  <Select
    {...props}
    value={props.input.value}
    onChange={value => props.input.onChange(value)}
    onBlur={() => props.input.onBlur(props.input.value)}
    options={props.options}
  />
);
