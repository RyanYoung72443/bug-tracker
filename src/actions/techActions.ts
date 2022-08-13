import {
  ADD_TECH,
  CLEAR_TECH,
  DELETE_TECH,
  EDIT_TECH,
  GET_TECHS,
  TECHS_ERROR,
  UPDATE_TECH
} from './types';
import { setLoading } from './logActions';
import { Tech } from '../models/tech.model';
import { useDispatch } from 'react-redux';
import { server } from '../constants/index';

export const getTechs = () => async (dispatch = useDispatch()) => {
  try {
    setLoading();

    const rs = await fetch(`${server}/techs`);
    const data: Array<Tech> = await rs.json();

    dispatch({
      type: GET_TECHS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: TECHS_ERROR,
      payload: error.response.data
    });
  }
};

export const addTech = (tech: Tech) => async (dispatch = useDispatch()) => {
  try {
    setLoading();

    const rs = await fetch(`${server}/techs`, {
      method: 'POST',
      body: JSON.stringify(tech),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data: Tech = await rs.json();

    dispatch({
      type: ADD_TECH,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: TECHS_ERROR,
      payload: error.response.data
    });
  }
};

export const deleteTech = (id: number) => async (dispatch = useDispatch()) => {
  try {
    setLoading();

    await fetch(`${server}/techs/${id}`, {
      method: 'DELETE'
    });

    dispatch({
      type: DELETE_TECH,
      payload: id
    });
  } catch (error) {
    dispatch({
      type: TECHS_ERROR,
      payload: error.response.data
    });
  }
};

export const updateTech = (tech: Tech) => async (dispatch = useDispatch()) => {
  try {
    setLoading();

    const rs = await fetch(`${server}/techs/${tech.id}`, {
      method: 'PUT',
      body: JSON.stringify(tech),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data: Tech = await rs.json();

    dispatch({
      type: UPDATE_TECH,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: TECHS_ERROR,
      payload: error.response.data
    });
  }
};

export const editTech = (tech: Tech) => {
  return {
    type: EDIT_TECH,
    payload: tech
  };
};

export const clearTech = () => {
  return {
    type: CLEAR_TECH,
    payload: null
  };
};
