import { useDispatch } from 'react-redux';
import { Log } from '../models/log.model';
import {
  ADD_LOG,
  CLEAR_CURRENT,
  DELETE_LOG,
  GET_LOGS,
  LOGS_ERROR,
  SEARCH_LOGS,
  SET_CURRENT,
  SET_LOADING,
  UPDATE_LOG,
} from './types';
import { server } from '../constants/index'

export const getLogs = () => async (dispatch = useDispatch()) => {
  try {
    setLoading();

    const rs = await fetch(`${server}/logs`);
    const data: Array<Log> = await rs.json();

    dispatch({
      type: GET_LOGS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: error.response.data
    })
  }
}

export const addLog = (log: Log) => async (dispatch = useDispatch()) => {
  try {
    setLoading();

    const rs = await fetch(`${server}/logs`, {
      method: 'POST',
      body: JSON.stringify(log),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data: Log = await rs.json();

    dispatch({
      type: ADD_LOG,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: error.response.data
    })
  }
}

export const deleteLog = (id: number) => async (dispatch = useDispatch()) => {
  try {
    setLoading();

    await fetch(`${server}/logs/${id}`, {
      method: 'DELETE'
    });

    dispatch({
      type: DELETE_LOG,
      payload: id
    })
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: error.response.data
    })
  }
}

export const updateLog = (log: Log) => async (dispatch = useDispatch()) => {
  try {
    setLoading();

    const rs = await fetch(`${server}/logs/${log.id}`, {
      method: 'PUT',
      body: JSON.stringify(log),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data: Log = await rs.json();

    dispatch({
      type: UPDATE_LOG,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: error.response.data
    })
  }
}

export const searchLogs = (text: string) => {
  return {
    type: SEARCH_LOGS,
    payload: text
  }
}

export const setCurrent = (log: Log) => {
  return {
    type: SET_CURRENT,
    payload: log
  }
}

export const clearCurrent = () => {
  return {
    type: CLEAR_CURRENT,
    payload: null
  }
}

export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};