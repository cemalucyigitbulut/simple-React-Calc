import { useState } from "react";
import { useReducer } from "react";
import DigButton from "./DigButton";
import OpButton from "./OpButton";
import "./App.css";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if(state.overwrite){
        return{
          ...state,
          currentOperand:payload.digit,
          overwrite:false,
        }
      }
      if (payload.digit === "0" && state.currentOperand === "0") {
        return state;
      }
      if (payload.digit === "." && state.currentOperand == null) {
        return {...state , currentOperand: payload.digit,};
      }
      if (payload.digit === "." && state.currentOperand == null) {
        return state;
      }
      if (payload.digit === "." && state.currentOperand.includes(".")) {
        return state;
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };
    case ACTIONS.CHOOSE_OPERATION:
      if(state.currentOperand == null && state.previousOperand == null) {
        return state
      }
      if (state.currentOperand == null){
        return {
          ...state,
          operation: payload.operation,
        }
      }
      if (state.previousOperand == null) {
        return {
          ...state,
          operation:payload.operation,
          previousOperand:state.currentOperand,
          currentOperand: null,
        }
      }
      
      return{
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      }

    case ACTIONS.DELETE_DIGIT:
      if(state.overwrite){
      return{
        ...state,
        overwrite:false,
        currentOperand:null,
      }
    }
    if(state.currentOperand == null ) return state
    if (state.currentOperand.lenght === 1) {
      return {...state, currentOperand:null}
    }
    return {
      ...state,
      currentOperand: state.currentOperand.slice(0 , -1)
    }

    
    case ACTIONS.CLEAR:
      return {
        ...state,
        currentOperand: "0",
        previousOperand: null,
        operation: null,
      };
    case ACTIONS.EVALUATE:
      if(state.operation == null || state.currentOperand == null || state.previousOperand == null){
        return state 
      }
      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation:null,
        currentOperand: evaluate(state),
      }
  }
}

function evaluate({currentOperand,previousOperand,operation}){
  const prev = parseFloat(previousOperand)
  const curr = parseFloat(currentOperand)
  if (isNaN(prev) || isNaN(curr)) return ""
  let computation = ""
  switch (operation) {
    case "+":
      computation = prev + curr
      break
    case "-":
      computation = prev - curr
      break
    case "÷":
      computation = prev / curr
      break
    case "*":
      computation = prev * curr
      break
  }
  return computation.toString()
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us" , {maximumFractionDigits:0,})
function formatOperand(operand){
  if(operand == null) return 
  const [integer,decimal] = operand.split('.')
  if(decimal == null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    <div className="container">
      <video src="/videos/stars.mp4" autoPlay loop muted />
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
          C
        </button>
        <button className="Operands" onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>Del</button>
        <OpButton operation="÷" dispatch={dispatch} />
        <DigButton digit="1" dispatch={dispatch} />
        <DigButton digit="2" dispatch={dispatch} />
        <DigButton digit="3" dispatch={dispatch} />
        <OpButton operation="*" dispatch={dispatch} />
        <DigButton digit="4" dispatch={dispatch} />
        <DigButton digit="5" dispatch={dispatch} />
        <DigButton digit="6" dispatch={dispatch} />
        <OpButton operation="+" dispatch={dispatch} />
        <DigButton digit="7" dispatch={dispatch} />
        <DigButton digit="8" dispatch={dispatch} />
        <DigButton digit="9" dispatch={dispatch} />
        <OpButton operation="-" dispatch={dispatch} />
        <DigButton digit="." dispatch={dispatch} />
        <DigButton digit="0" dispatch={dispatch} />
        <button className="span-two" onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>
      </div>
    </div>
  );
}

export default App;
