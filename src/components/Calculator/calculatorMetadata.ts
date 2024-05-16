type IPayloadData = {
  digit?: string;
  operation?: string;
};

export type TCalculatorNumber = string | null | undefined;

export type TCalculatorState = {
  previousOperand: TCalculatorNumber;
  operation: TCalculatorNumber;
  currentOperand: TCalculatorNumber;
  overwrite: boolean;
};

export type TCalculatorAction = {
  type: string;
  payload?: IPayloadData;
};

export interface IDigitButton {
  dispatch: React.Dispatch<TCalculatorAction>;
  digit: string;
}

export interface IOperationButton {
  dispatch: React.Dispatch<TCalculatorAction>;
  operation: string;
}

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
};
