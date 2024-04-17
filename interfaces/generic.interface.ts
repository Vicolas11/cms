import { IOpt } from "./props.interface";

export interface SelectOptType {
  user: IOpt | null;
  dept: IOpt | null;
  facult: IOpt | null;
}

export interface InputValueType {
  [key: string]: string;
}

export interface InputIsValidType {
  [key: string]: boolean;
}
