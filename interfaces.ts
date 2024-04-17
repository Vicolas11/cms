export interface InputValue {
  [key: string]: string;
}

export interface ActionType {
  [key: string]: {
    isSave: boolean;
    isEdit: boolean;
  };
}

export interface MultiInputValType {
  [key: string]: {
    _id: string;
    question: string;
    time: number;
    score: number;
    options: {
      opt: string;
      name: string;
      value: string;
      isCorrect: boolean;
      selected: boolean;
    }[];
  };
}

export interface QuestionList {
  _id: string;
  question: string;
  time: number;
  score: number;
  options: {
    opt: string;
    name: string;
    value: string;
    isCorrect: boolean;
    selected: boolean;
  }[];
}
[];

export interface ImageFileType {
  file: File | null;
  image: string;
}
