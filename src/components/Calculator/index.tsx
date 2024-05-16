import { useReducer, useState } from "react";

import DigitButton from "../DigitButton";
import OperationButton from "../OperationButton";

import {
  ACTIONS,
  TCalculatorState,
  TCalculatorAction,
  TCalculatorNumber,
} from "./calculatorMetadata";

const Calculator = () => {
  const [resultHistory, setResultHistory] = useState<number[]>([]);
  const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
    maximumFractionDigits: 0,
  });

  const initialState = {
    previousOperand: null,
    operation: null,
    currentOperand: null,
    overwrite: false,
  } as TCalculatorState;

  const evaluate = (state: TCalculatorState) => {
    const { currentOperand, previousOperand, operation } = state;

    if (previousOperand && currentOperand) {
      let computation;
      const prev = parseFloat(previousOperand);
      const current = parseFloat(currentOperand);

      switch (operation) {
        default:
          break;

        case "+":
          computation = prev + current;
          setResultHistory([...resultHistory, computation]);
          break;

        case "-":
          computation = prev - current;
          setResultHistory([...resultHistory, computation]);
          break;

        case "*":
          computation = prev * current;
          setResultHistory([...resultHistory, computation]);
          break;

        case "÷":
          computation = prev / current;
          setResultHistory([...resultHistory, computation]);
          break;
      }
      return String(computation);
    }

    return "";
  };

  const reducer = (
    state: TCalculatorState,
    action: TCalculatorAction
  ): TCalculatorState => {
    const { type, payload } = action;
    switch (type) {
      default:
        return {} as TCalculatorState;

      case ACTIONS.ADD_DIGIT:
        if (state.overwrite) {
          return {
            ...state,
            currentOperand: payload?.digit,
            overwrite: false,
          };
        }

        if (payload?.digit === "0" && state.currentOperand === "0") {
          return state;
        }

        if (payload?.digit === "." && state.currentOperand === undefined) {
          return state;
        }

        if (
          payload?.digit === "." &&
          state.currentOperand &&
          state.currentOperand.includes(".")
        ) {
          return state;
        }

        return {
          ...state,
          currentOperand: `${state.currentOperand || ""}${payload?.digit}`,
        };

      case ACTIONS.CHOOSE_OPERATION:
        if (state.currentOperand == null && state.previousOperand == null) {
          return state;
        }

        if (state.currentOperand == null) {
          return {
            ...state,
            operation: payload?.operation,
          };
        }

        if (state.previousOperand == null) {
          return {
            ...state,
            operation: payload?.operation,
            previousOperand: state.currentOperand,
            currentOperand: null,
          };
        }

        return {
          ...state,
          previousOperand: evaluate(state),
          operation: payload?.operation,
          currentOperand: null,
        };

      case ACTIONS.CLEAR:
        return initialState;

      case ACTIONS.DELETE_DIGIT:
        if (state.overwrite) {
          return {
            ...state,
            overwrite: false,
            currentOperand: null,
          };
        }

        if (state.currentOperand == null) return state;

        if (state.currentOperand.length === 1) {
          return { ...state, currentOperand: null };
        }

        return {
          ...state,
          currentOperand: state.currentOperand.slice(0, -1),
        };

      case ACTIONS.EVALUATE:
        if (
          state.operation == null ||
          state.currentOperand == null ||
          state.previousOperand == null
        ) {
          return state;
        }

        return {
          ...state,
          overwrite: true,
          previousOperand: null,
          operation: null,
          currentOperand: evaluate(state),
        };
    }
  };

  const [calculatorState, dispatch] = useReducer(reducer, initialState);
  const { currentOperand, previousOperand, operation } = calculatorState;

  const formatOperand = (operand: TCalculatorNumber) => {
    if (operand == null) return;
    const [integer, decimal] = operand.split(".");
    if (decimal == null) return INTEGER_FORMATTER.format(Number(integer));
    return `${INTEGER_FORMATTER.format(Number(integer))}.${decimal}`;
  };

  return (
    <div className="calculator-container">
      <div className="calculator-grid">
        <div className="output">
          <div className="previous-operand">
            {formatOperand(previousOperand)} {operation}
          </div>
          <div className="current-operand">{formatOperand(currentOperand)}</div>
        </div>
        <button
          className="span-two"
          onClick={() => dispatch({ type: ACTIONS.CLEAR })}
        >
          AC
        </button>
        <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>
          DEL
        </button>
        <OperationButton operation="÷" dispatch={dispatch} />
        <DigitButton digit="1" dispatch={dispatch} />
        <DigitButton digit="2" dispatch={dispatch} />
        <DigitButton digit="3" dispatch={dispatch} />
        <OperationButton operation="*" dispatch={dispatch} />
        <DigitButton digit="4" dispatch={dispatch} />
        <DigitButton digit="5" dispatch={dispatch} />
        <DigitButton digit="6" dispatch={dispatch} />
        <OperationButton operation="+" dispatch={dispatch} />
        <DigitButton digit="7" dispatch={dispatch} />
        <DigitButton digit="8" dispatch={dispatch} />
        <DigitButton digit="9" dispatch={dispatch} />
        <OperationButton operation="-" dispatch={dispatch} />
        <DigitButton digit="." dispatch={dispatch} />
        <DigitButton digit="0" dispatch={dispatch} />
        <button
          className="span-two"
          onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
        >
          =
        </button>

        <button
          className="clearHistory"
          onClick={() => {
            setResultHistory([]);
          }}
        >
          Clear History
        </button>
      </div>

      <div className="resultHistory">
        <div className="historyTitleBackground">
          <h1>History</h1>
        </div>
        {resultHistory.map((result) => {
          return <h2>{result}</h2>;
        })}
      </div>
    </div>
  );
};

export default Calculator;
