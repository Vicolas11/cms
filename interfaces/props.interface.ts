import { Dispatch, ReactElement, ReactNode, SetStateAction } from "react";
import { Role, UserProfile } from "./userData.interface";
import {
  AComplaintResp,
  ComplaintResp,
  ReComplaintResp,
} from "./action.interface";
import { GetFacultType } from "./generic.interface";

export interface IOpt {
  label: string | null | undefined;
  value: string | null | undefined;
}

export interface ICustomSelect {
  options: IOpt[];
  placeholder?: string;
  dropDownColor?: string;
  onSelect: (val: IOpt, name?: string) => void;
  prefillId?: string | number | undefined | null;
  isAsync?: boolean;
  inProgress?: boolean;
  isError?: boolean;
  showBtn?: boolean;
  loadMore?: Dispatch<SetStateAction<number>>;
  name?: string;
}

export type dataType = string | number | boolean | null;

export type Trow = {
  [key: string]: dataType;
};

export interface TableProps {
  isCustomTr?: boolean;
  tableDataElem?: (
    id: dataType,
    row: dataType[],
    data: dataType,
    colIndex: number,
    rowIndex: number,
    complainerUserId: string
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
  [key: string]: string | boolean | any;
}

export interface ViewModalProps {
  userId: string | null | undefined;
  showModal: string | null;
  detail: Detail | undefined | null;
}

export type AccountType = UserProfile | null | undefined;
export type ComplaintRespType = ReComplaintResp | null | undefined;

export interface ComplaintLayoutProps {
  children: ReactNode;
}

export interface ReportFormProps {
  faculty?: GetFacultType;
  department?: GetFacultType;
  studAffair?: GetFacultType;
  complaints?: ComplaintRespType;
  isEdit?: boolean;
  setShow?: Dispatch<SetStateAction<string | null>>;
  editedData?: AComplaintResp | undefined | null;
}

export interface SearchParams {
  searchParams?: {
    id?: string;
    query?: string;
    page?: string;
    perPage?: string;
  };
}

export interface QueryParams {
  currentPg: number;
  perPage: number;
  complaints?: ReComplaintResp;
  userId: string;
}

export interface Params {
  params: {
    id: string;
  };
}

export interface NavProps {
  token?: string | undefined;
  bubble?: number;
  data?: UserProfile;
  isHome?: boolean;
}

export interface ActionProps {
  userData?: UserProfile | null | undefined;
}
