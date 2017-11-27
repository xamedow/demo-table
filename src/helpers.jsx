import React from 'react';
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

export const getColumns = (dataJSON) => {
  const goalsColumns = getGoalsColumns(dataJSON);
  return [...MAIN_DATA_DEFINITION, ...goalsColumns];
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
