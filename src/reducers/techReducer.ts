import {
  ADD_TECH,
  CLEAR_TECH,
  DELETE_TECH,
  EDIT_TECH,
  GET_TECHS,
  TECHS_ERROR,
  UPDATE_TECH
} from "../actions/types";
import { TechActionTypes, TechState } from "../models/tech.model";

const initialState = {
  techs: null,
  current: null,
  loading: false,
  error: null
}

export default (state: TechState = initialState,
  action: TechActionTypes) => {
  switch (action.type) {
    case GET_TECHS:
      return {
        ...state,
        techs: action.payload,
        loading: false,
      };
    case ADD_TECH:
      return {
        ...state,
        techs: [...state.techs, action.payload],
        loading: false
      }
    case EDIT_TECH:
      return {
        ...state,
        current: action.payload
      }
    case CLEAR_TECH:
      return {
        ...state,
        current: null
      }
    case DELETE_TECH:
      return {
        ...state,
        techs: state.techs.filter(tech => tech.id !== action.payload),
        loading: false
      }
    case UPDATE_TECH:
      return {
        ...state,
        techs: state.techs.map(tech => tech.id === action.payload.id ? action.payload : tech)
      }
    case TECHS_ERROR:
      console.error(action.payload);
      return {
        ...state,
        loading: false,
        err: action.payload
      };
    default:
      return state;
  }
};