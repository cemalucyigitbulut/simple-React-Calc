import {ACTIONS} from "./App"
import './App.css'


export default function DigButton({ dispatch, digit }) {
  return (
    <button className='Numbers'
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}>
      {digit}
    </button>
  );
}
