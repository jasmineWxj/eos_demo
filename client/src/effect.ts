import { useEffect, useState } from 'react';
import { Option } from './MultiCheck/type';

import { request } from './utils/request';
 
export const DEFULT_SELECT_VALUES = ["react"];

export const useSelectedOptionsChange = () => {
    const [selectedValues, setSelectedValues] = useState<string[]>(DEFULT_SELECT_VALUES);
    const [options, setOptions] = useState<Option[]>([]);
    const onSelectedOptionsChange = (selectedOptions: Option[]): void => {
        setSelectedValues(selectedOptions.map((it) => it.value));
    };
    useEffect(() => {
        request("http://localhost:3001/api/getMockOptions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          }
        })
            .then((res)=>{
                if(res?.seccess){
                    setOptions(res.data||[]);
                }
            })
      }, []);
    return {
        selectedValues,
        options,
        onSelectedOptionsChange
    }
}