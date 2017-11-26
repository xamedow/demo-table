import React from 'react';
import { GoalName } from 'components/ui/DataTable';

const GOALS_HEADERS = {
  cpa: 'CPA, р.',
  cr: 'CR, %',
  count: 'Кол-во',
  revenue: 'Revenue, р.',
  gross_profit: 'Gross Profit, р.',
  roi: 'ROI',
};

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

// eslint-disable-next-line import/prefer-default-export
export const getGoalsColumns = (dataJSON) => (
  dataJSON.goals_list.map(({ name, goal_id }, idx) => (
    {
      active: true,
      id: goal_id,
      name,
      Header: <GoalName name={name} index={idx} />,
      columns: getGoalsInnerColumns({ dataJSON, idx }),
    }
  )));
