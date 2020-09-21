import {
  ADD_TECH,
  CLEAR_TECH,
  DELETE_TECH,
  EDIT_TECH,
  GET_TECHS,
  TECHS_ERROR,
  UPDATE_TECH
} from './types';
import { setLoading } from './logActions'


export const getTechs = () => async (dispatch) => {
  try {
    setLoading();

    const rs = await fetch('/techs');
    const data = await rs.json();

    dispatch({
      type: GET_TECHS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: TECHS_ERROR,
      payload: error.response.data
    })
  }
}

export const addTech = tech => async (dispatch) => {
  try {
    setLoading();

    const rs = await fetch('/techs', {
      method: 'POST',
      body: JSON.stringify(tech),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await rs.json();

    dispatch({
      type: ADD_TECH,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: TECHS_ERROR,
      payload: error.response.data
    })
  }
}

export const deleteTech = id => async dispatch => {
  try {
    setLoading();

    await fetch(`/techs/${id}`, {
      method: 'DELETE'
    });

    dispatch({
      type: DELETE_TECH,
      payload: id
    })
  } catch (error) {
    dispatch({
      type: TECHS_ERROR,
      payload: error.response.data
    })
  }
}

export const updateTech = tech => async dispatch => {
  try {
    setLoading();

    const rs = await fetch(`/techs/${tech.id}`, {
      method: 'PUT',
      body: JSON.stringify(tech),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await rs.json();

    dispatch({
      type: UPDATE_TECH,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: TECHS_ERROR,
      payload: error.response.data
    })
  }
}

export const editTech = tech => {
  return {
    type: EDIT_TECH,
    payload: tech
  }
}

export const clearTech = () => {
  return {
    type: CLEAR_TECH,
    payload: null
  }
}