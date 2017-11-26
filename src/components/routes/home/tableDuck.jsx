import { appName } from 'config';
import { StatusIcon, ModalLinkWrapper } from 'components/ui/DataTable';
import { getGoalsColumns } from 'helpers';

/**
 * Constants
 * */
export const moduleName = 'table';
const prefix = `${appName}/${moduleName}`;

export const SET_COLUMNS = `${prefix}/SET_COLUMNS`;
export const UPDATE_COLUMNS = `${prefix}/UPDATE_COLUMNS`;
export const SHOW_MODAL = `${prefix}/SHOW_MODAL`;
export const HIDE_MODAL = `${prefix}/HIDE_MODAL`;

const MAIN_DATA_DEFINITION = [
  {
    active: true,
    Header: 'Кампании',
    id: 'value',
    columns: [{
      id: 'value',
      accessor: d => d.value,
      Cell: ModalLinkWrapper,
    }],
  },
  {
    active: true,
    Header: 'Статус',
    id: 'status',
    columns: [{
      id: 'status',
      accessor: d => d.state,
      Cell: StatusIcon,
      width: 76,
    }],
  },
  {
    active: true, Header: 'Показы', id: 'shows', columns: [{ id: 'shows', accessor: d => d.costs.shows }],
  },
  {
    active: true, Header: 'Клики', id: 'clicks', columns: [{ id: 'clicks', accessor: d => d.costs.clicks }],
  },
  {
    active: true, Header: 'CTR', id: 'ctr', columns: [{ id: 'ctr', accessor: d => `${d.costs.ctr}%` }],
  },
  {
    active: true, Header: 'CPS', id: 'cpc', columns: [{ id: 'cpc', accessor: d => d.costs.cpc }],
  },
  {
    active: true, Header: 'Затраты', id: 'cost', columns: [{ id: 'cost', accessor: d => d.costs.cost }],
  },
];

/**
 * Reducer
 * */
export const ReducerRecord = {
  loading: false,
  columns: MAIN_DATA_DEFINITION,
  isModalOpen: false,
};

export default function reducer(state = ReducerRecord, action) {
  const { type, payload } = action;

  switch (type) {
    // eslint-disable-next-line no-case-declarations
    case SET_COLUMNS:
      const columns = getGoalsColumns(payload);
      return Object.assign({}, state, { columns: [...MAIN_DATA_DEFINITION, ...columns] });

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

export function updateColumns(data) {
  return {
    type: UPDATE_COLUMNS,
    payload: data,
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
