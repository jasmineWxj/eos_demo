import React, { useState, useMemo, useCallback } from "react";
import { Option, Props } from "./type";

export const MULTICHECK_SELECTED_ALL = "MULTICHECK_SELECTED_ALL";

export const MULTICHECK_SELECTED_ALL_OPTION = {
  label: "全部",
  value: MULTICHECK_SELECTED_ALL,
};

const getRenderValues = (currentValues: string[], options: Option[]) => {
  let isSelectedAll = true;
  options.forEach((option) => {
    if (!currentValues.find((value) => value === option.value)) {
      isSelectedAll = false;
    }
  });
  if (isSelectedAll) {
    return [MULTICHECK_SELECTED_ALL].concat(currentValues);
  }
  return currentValues;
};

export const useSelectValues = ({
  onChange,
  options,
  values,
  defaultValues,
  columns = 1,
}: Props) => {
  const [selectedValues, setSelectedValues] = useState(defaultValues || []);
  const handleCheckedChange = (value: string) => {
    let currentValues = values || selectedValues;
    const currentSelectedOptions: Option[] = [];
    if (value === MULTICHECK_SELECTED_ALL) {
      // 全选状态改变单独处理
      if (currentValues.length === options.length) {
        currentValues = [];
      } else {
        currentValues = options.map((option: Option) => option.value);
      }
    } else {
      const valueKey = currentValues.indexOf(value);
      if (valueKey === -1) {
        currentValues.push(value);
      } else {
        currentValues.splice(valueKey, 1);
      }
    }
    currentValues.forEach((selectedOptionValue: string) => {
      if (selectedOptionValue !== MULTICHECK_SELECTED_ALL) {
        const findOne = options.find(
          (option: Option) => option.value === selectedOptionValue
        );
        if (findOne) {
          currentSelectedOptions.push(findOne);
        }
      }
    });
    if (!values) {
      setSelectedValues([...currentValues]);
    }
    onChange && onChange(currentSelectedOptions);
  };
  const optionsUI = useMemo(() => {
    const allOptions = [MULTICHECK_SELECTED_ALL_OPTION].concat(options);
    const currentValues = getRenderValues(values || selectedValues, options);
    const mapOptionColumnList = [];
    const subGroupLength = Math.ceil(allOptions.length / columns);
    let endIndex = 0;
    for (let i = 0; i < allOptions.length; i = endIndex) {
      endIndex = i + subGroupLength;
      if (endIndex > allOptions.length) {
        endIndex = allOptions.length;
      }
      mapOptionColumnList.push(allOptions.slice(i, endIndex));
    }
    const allItems = mapOptionColumnList.map((columnItem, columnIndex) => {
      const optionsItems = columnItem.map((item) => {
        const { label, value } = item;
        return (
          <div className="MultiCheck-option-wrap" key={value}>
            <div>
              <input
                type="checkbox"
                value={value}
                checked={currentValues.includes(value)}
                onChange={() => handleCheckedChange(value)}
              />
            </div>
            <div>{label}</div>
          </div>
        );
      });
      return (
        <div className="MultiCheck-column-wrap" key={columnIndex}>
          {optionsItems}
        </div>
      );
    });
    return allItems;
  }, [columns, options, values, selectedValues]);
  return {
    optionsUI,
  };
};
