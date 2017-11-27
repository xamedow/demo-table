import React from 'react';
import { get, flattenDeep } from 'lodash';
import { GoalName, StatusIcon, ModalLinkWrapper } from 'components/ui/DataTable';

const GOALS_HEADERS = {
  cpa: 'CPA, р.',
  cr: 'CR, %',
  count: 'Кол-во',
  revenue: 'Revenue, р.',
  gross_profit: 'Gross Profit, р.',
  roi: 'ROI',
};

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

const getGoalsInnerColumns = ({ dataJSON, idx }) => {
  const sampleGoal = dataJSON.content[0].goals[idx];
  return Object.keys(GOALS_HEADERS)
    .filter(headerKey => Object.prototype.hasOwnProperty.call(sampleGoal, headerKey))
    .map(headerKey => ({
      active: true,
      Header: GOALS_HEADERS[headerKey],
      id: `${headerKey}-${idx}`,
      accessor: d => d.goals[idx][headerKey],
    }));
};

const getGoalsColumns = (dataJSON) => (
  dataJSON.goals_list.map(({ name, goal_id }, idx) => (
    {
      active: true,
      id: goal_id,
      name,
      Header: <GoalName name={name} index={idx} />,
      columns: getGoalsInnerColumns({ dataJSON, idx }),
    }
  )));

function columnToKeyActive(column) {
  return {[column.id]: column.active};
}

export function pickColumns(columns) {
  return (flattenDeep(columns.map((column) => {
    if (column.name && column.columns) {
      return [columnToKeyActive(column), pickColumns(column.columns)];
    }

    return columnToKeyActive(column);
  })).reduce((acc, column) => Object.assign(acc, column), {}));
}

export function saveColumns(columns) {
  if (window.localStorage) {
    window.localStorage.setItem('columns', JSON.stringify(pickColumns(columns)));
  }
}

export function getSavedColumns() {
  if (window.localStorage) {
    return JSON.parse(window.localStorage.getItem('columns'));
  }
  return null;
}

export function mergeColumnsData(savedColumnsData, rawColumns) {
  return rawColumns.map(column => {
    const nextColumn = Object.assign({}, column);
    if (nextColumn.name && nextColumn.columns) {
      nextColumn.columns = mergeColumnsData(savedColumnsData, nextColumn.columns);
    }

    const active = get(savedColumnsData, `${[nextColumn.id]}`, false);
    return Object.assign({}, nextColumn, { active });
  });
}

export const getColumns = (dataJSON) => {
  const savedColumnsData = getSavedColumns();
  const goalsColumns = getGoalsColumns(dataJSON);
  const rawColumns = [...MAIN_DATA_DEFINITION, ...goalsColumns];

  return savedColumnsData ? mergeColumnsData(savedColumnsData, rawColumns) : rawColumns;
};

export const mergeGoalsColumns = (source, target) => (
  target.map(column => {
    if (column.id === source.id) {
      return Object.assign({}, column, { active: source.active });
    }
    if (column.name && column.columns) {
      return Object.assign({}, column, { columns: mergeGoalsColumns(source, column.columns) });
    }
    return column;
  }));
