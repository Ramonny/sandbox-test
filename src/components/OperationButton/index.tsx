import { ACTIONS, IOperationButton } from "../Calculator/calculatorMetadata";

const OperationButton: React.FC<IOperationButton> = ({
  dispatch,
  operation,
}) => {
  return (
    <button
      onClick={() =>
        dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })
      }
    >
      {operation}
    </button>
  );
};

export default OperationButton;
