import {
  ADD_TECH,
  CLEAR_TECH,
  DELETE_TECH,
  EDIT_TECH,
  GET_TECHS,
  TECHS_ERROR,
  UPDATE_TECH
} from '../actions/types';

export interface Tech {
  id: number;
  firstName: string;
  lastName: string;
}

export interface TechState {
  techs: Array<Tech>;
  current?: Tech;
  loading: boolean;
  error?: Error;
}

interface GetTechs {
  type: typeof GET_TECHS;
  payload: Array<Tech>;
}

interface AddTech {
  type: typeof ADD_TECH;
  payload: Tech;
}

interface DeleteTech {
  type: typeof DELETE_TECH;
  payload: number;
}

interface UpdateTech {
  type: typeof UPDATE_TECH;
  payload: Tech;
}

interface EditTech {
  type: typeof EDIT_TECH;
  payload: Tech;
}

interface ClearTech {
  type: typeof CLEAR_TECH;
  payload: null;
}

interface TechsError {
  type: typeof TECHS_ERROR;
  payload: Error;
}

export type TechActionTypes =
  | GetTechs
  | AddTech
  | DeleteTech
  | EditTech
  | UpdateTech
  | ClearTech
  | TechsError;
