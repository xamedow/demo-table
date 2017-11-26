import React from 'react';
import { appName } from 'config';
import { StatusIcon } from 'components/ui/DataTable';
import { getGoalsColumns } from '../../../helpers';

/**
 * Constants
 * */
export const moduleName = 'table';
const prefix = `${appName}/${moduleName}`;

export const GET_COLUMNS = `${prefix}/GET_COLUMNS`;

const MAIN_DATA_DEFINITION = [
  {
    active: true, Header: 'Кампании', columns: [{ id: 'value', accessor: d => <a href="/">{d.value}</a> }],
  },
  {
    active: true, Header: 'Статус', columns: [{ id: 'status', accessor: d => d.state, Cell: StatusIcon, width: 76 }],
  },
  {
    active: true, Header: 'Показы', columns: [{ id: 'shows', accessor: d => d.costs.shows }],
  },
  {
    active: true, Header: 'Клики', columns: [{ id: 'clicks', accessor: d => d.costs.clicks }],
  },
  {
    active: true, Header: 'CTR', columns: [{ id: 'ctr', accessor: d => `${d.costs.ctr}%` }],
  },
  {
    active: true, Header: 'CPS', columns: [{ id: 'cpc', accessor: d => d.costs.cpc }],
  },
  {
    active: true, Header: 'Затраты', columns: [{ id: 'cost', accessor: d => d.costs.cost }],
  },
];

/**
 * Reducer
 * */
export const ReducerRecord = {
  loading: false,
  columns: MAIN_DATA_DEFINITION,
};

export default function reducer(state = ReducerRecord, action) {
  const { type, payload } = action;

  switch (type) {
    // eslint-disable-next-line no-case-declarations
    case GET_COLUMNS:
      const columns = getGoalsColumns(payload);
      return Object.assign({}, state, { columns: [...MAIN_DATA_DEFINITION, ...columns] });

    default:
      return state;
  }
}

/**
 * Action Creators
 * */

export function getColumns(data) {
  return {
    type: GET_COLUMNS,
    payload: data,
  };
}
