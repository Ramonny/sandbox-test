import { ACTIONS, IDigitButton } from "../Calculator/calculatorMetadata";

const DigitButton: React.FC<IDigitButton> = ({ dispatch, digit }) => {
  return (
    <button
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
    >
      {digit}
    </button>
  );
};

export default DigitButton;
