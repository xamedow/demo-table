import { appName } from 'config';
import { getColumns, mergeGoalsColumns } from 'helpers';

/**
 * Constants
 * */
export const moduleName = 'table';
const prefix = `${appName}/${moduleName}`;

export const SET_COLUMNS = `${prefix}/SET_COLUMNS`;
export const UPDATE_COLUMNS = `${prefix}/UPDATE_COLUMNS`;
export const UPDATE_COLUMN = `${prefix}/UPDATE_COLUMN`;
export const SHOW_MODAL = `${prefix}/SHOW_MODAL`;
export const HIDE_MODAL = `${prefix}/HIDE_MODAL`;


/**
 * Reducer
 * */
export const ReducerRecord = {
  loading: false,
  columns: [],
  isModalOpen: false,
};

export default function reducer(state = ReducerRecord, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_COLUMNS:
      return Object.assign({}, state, { columns: getColumns(payload) });

    case UPDATE_COLUMN:
      return Object.assign({}, state, { columns: mergeGoalsColumns(payload, state.columns) });

    case SHOW_MODAL:
      return Object.assign({}, state, { isModalOpen: true });

    case HIDE_MODAL:
      return Object.assign({}, state, { isModalOpen: false });

    default:
      return state;
  }
}

/**
 * Action Creators
 * */

export function setColumns(data) {
  return {
    type: SET_COLUMNS,
    payload: data,
  };
}

export function updateColumn(id, active) {
  return {
    type: UPDATE_COLUMN,
    payload: { id, active },
  };
}

export function updateColumns() {
  return {
    type: UPDATE_COLUMNS,
  };
}

export function showModal(e) {
  e.preventDefault();
  return {
    type: SHOW_MODAL,
  };
}

export function hideModal() {
  return {
    type: HIDE_MODAL,
  };
}
