import {
  ADD_LOG,
  CLEAR_CURRENT,
  DELETE_LOG,
  GET_LOGS,
  LOGS_ERROR,
  SET_CURRENT,
  SET_LOADING,
  UPDATE_LOG,
} from './types';

export const getLogs = () => async (dispatch) => {
  try {
    setLoading();

    const rs = await fetch('/logs');
    const data = await rs.json();

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

export const addLog = log => async (dispatch) => {
  try {
    setLoading();

    const rs = await fetch('/logs', {
      method: 'POST',
      body: JSON.stringify(log),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await rs.json();

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

export const deleteLog = id => async dispatch => {
  try {
    setLoading();

    await fetch(`/logs/${id}`, {
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

export const updateLog = log => async dispatch => {
  try {
    setLoading();

    const rs = await fetch(`/logs/${log.id}`, {
      method: 'PUT',
      body: JSON.stringify(log),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await rs.json();

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

export const setCurrent = log => {
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