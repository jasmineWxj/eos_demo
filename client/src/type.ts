import { Option } from "./MultiCheck/type";

export interface ResponseNormal {
  seccess: boolean;
}
export interface OptionsResponse extends ResponseNormal {
  data: Option[];
}
