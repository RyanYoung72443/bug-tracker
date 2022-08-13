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

export interface Log {
  id: number;
  message: string;
  attention: boolean;
  tech: string;
  date: Date;
}

export interface LogState {
  logs: Array<Log>;
  search: string;
  current?: Log;
  loading: boolean;
  err?: Error;
}

interface AddLog {
  type: typeof ADD_LOG;
  payload: Log;
}

interface DeleteLog {
  type: typeof DELETE_LOG;
  payload: number;
}

interface GetLogs {
  type: typeof GET_LOGS;
  payload: Array<Log>;
}

interface UpdateLog {
  type: typeof UPDATE_LOG;
  payload: Log;
}

interface SearchLog {
  type: typeof SEARCH_LOGS;
  payload: string;
}

interface SetCurrent {
  type: typeof SET_CURRENT;
  payload: Log;
}

interface ClearCurrent {
  type: typeof CLEAR_CURRENT;
  payload: null;
}

interface SetLoading {
  type: typeof SET_LOADING;
  payload: null;
}

interface LogError {
  type: typeof LOGS_ERROR;
  payload: Error;
}

export type LogActionTypes =
  | AddLog
  | DeleteLog
  | GetLogs
  | UpdateLog
  | SearchLog
  | SetCurrent
  | ClearCurrent
  | SetLoading
  | LogError;
