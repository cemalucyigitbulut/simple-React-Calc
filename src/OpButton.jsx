import { ACTIONS } from "./App";
import "./App.css";

export default function OpButton({ dispatch, operation }) {
  return (
    <button
      className="Operands"   
      onClick={() =>
        dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })
      }
    >
      {operation}
    </button>
  );
}
