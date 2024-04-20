import { Dispatch, ReactElement, SetStateAction } from "react";
import { StylesConfig } from "react-select";

export interface IOpt {
  label: string;
  value: string;
}

export interface ICustomSelect {
  options: IOpt[];
  placeholder?: string;
  dropDownColor?: string;
  onSelect: (val: IOpt, name?: string) => void;
  prefillId?: string | number;
  isAsync?: boolean;
  inProgress?: boolean;
  isError?: boolean;
  showBtn?: boolean;
  loadMore?: Dispatch<SetStateAction<number>>;
  name?: string;
}

export type dataType = string | number | boolean;

export type Trow = {
  [key: string]: dataType;
};

export interface TableProps {
  title: string;
  isCustomTr?: boolean;
  showFilter?: boolean;
  tableDataElem?: (
    id: dataType,
    row: dataType[],
    data: dataType,
    colIndex: number,
    rowIndex: number
  ) => ReactElement<HTMLTableCellElement>;
  theadData: string[];
  tbodyData: Trow[];
  totalResults: number;
  resultsPerPage: number;
  maxVisiblePages: number;
  xtraStyle?: string;
  handlePageChange: (page: number) => void;
  emptyText: string;
  showLoader?: boolean;
  isError?: boolean;
  errMsg?: string;
  getUniqIdCallback?: (id: dataType) => void;
  keysToRemove?: string[]; 
}

interface Detail {
  [key: string]: string | boolean
}

export interface ViewModalProps {
  showModal: string | null;
  detail: Detail | undefined;
}
