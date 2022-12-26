import React, { FunctionComponent, useEffect, useState } from "react";
import ReactDOM from "react-dom";

import './utils/errorReport';

import MultiCheck from "./MultiCheck/MultiCheck";
import { useSelectedOptionsChange } from './effect';

// setTimeout(()=>{
//   throw new Error('js-runtime error');
// }, 1000)
const App: FunctionComponent = (): JSX.Element => {
  const {
    selectedValues,
    onSelectedOptionsChange,
    options
  } = useSelectedOptionsChange();
  return (
    <div>
      {/* <img src="error-url"/> */}
      <MultiCheck
        label="你最喜欢的课程是?"
        options={options}
        onChange={onSelectedOptionsChange}
        values={selectedValues}
        columns={4}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#react-root"));
