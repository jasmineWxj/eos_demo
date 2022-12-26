
import React from "react";

import { Props } from "./type";
import { useSelectValues } from "./effect";

import "./MultiCheck.css";

/**
 * Notice:
 * 1. There should be a special `Select All` option with checkbox to control all passing options
 * 2. If columns > 1, the options should be placed from top to bottom in each column
 *
 * @param {string} label - the label text of this component
 * @param {Option[]} options - options
 * @param {string[]} values -  checked option values
 * @param {string[]} defaultValues - default checked option values
 * @param {number} columns - default value is 1
 * @param {Function} onChange - when checked options are changed,
 *                             they should be passed to outside
 */

const MultiCheck: React.FunctionComponent<Props> = (props): JSX.Element => {
  const {
    label
  } = props;
  const { optionsUI } = useSelectValues(props);
  return (
    <div className="MultiCheck">
      <div className="MultiCheck-label-wrap">{label}</div>
      <div className="MultiCheck-content-wrap">
        <div className="MultiCheck-content">{optionsUI}</div>
      </div>
    </div>
  );
};

export default MultiCheck;
