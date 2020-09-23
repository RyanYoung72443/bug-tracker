import {
  ADD_LOG,
  CLEAR_CURRENT,
  DELETE_LOG,
  GET_LOGS,
  LOGS_ERROR,
  SEARCH_LOGS,
  SET_CURRENT,
  SET_LOADING,
  UPDATE_LOG
} from '../actions/types';
import { Log, LogActionTypes, LogState } from '../models/log.model';

const initialState = {
  logs: [],
  search: '',
  loading: false,
}

export default (state: LogState = initialState,
  action: LogActionTypes) => {
  switch (action.type) {
    case GET_LOGS:
      return {
        ...state,
        logs: action.payload,
        loading: false,
      };
    case ADD_LOG:
      return {
        ...state,
        logs: [...state.logs, action.payload],
        loading: false
      }
    case DELETE_LOG:
      return {
        ...state,
        logs: state.logs.filter((log: Log) => log.id !== action.payload),
        loading: false
      }
    case UPDATE_LOG:
      return {
        ...state,
        logs: state.logs.map((log: Log) => log.id === action.payload.id ? action.payload : log)
      }
    case SEARCH_LOGS:
      return {
        ...state,
        search: action.payload
      }
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      }
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      }
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case LOGS_ERROR:
      console.error(action.payload);
      return {
        ...state,
        loading: false,
        err: action.payload
      };
    default:
      return state;
  }
}