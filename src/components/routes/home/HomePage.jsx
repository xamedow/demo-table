import React from 'react';
import DataTable from 'components/ui/DataTable';
import dataJSON from 'data.json';
import Icon from 'components/ui/Icon';
import pause from 'static/img/pause-icon.png';
import play from 'static/img/play-icon.png';

const statusAccessor = (d) => {
  if (!d.state) return null;

  const src = d.state === 'new' ? play : pause;
  return <Icon src={src} />;
};

const dataDefinition = [
  {
    active: true, Header: 'Кампании', columns: [{ id: 'value', accessor: d => <a href="/">{d.value}</a> }],
  },
  {
    active: true, Header: 'Статус', columns: [{ id: 'status', accessor: statusAccessor, width: 76 }],
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

const GOALS_HEADERS = {
  cpa: 'CPA, р.',
  cr: 'CR, %',
  count: 'Кол-во',
  revenue: 'Revenue, р.',
  gross_profit: 'Gross Profit, р.',
  roi: 'ROI',
};

const renderGoalName = (name, index) => (
  <div>
    <div style={{ color: '#97123F' }}>{name}</div>
    <div style={{ color: '#8A8A8A' }}>&ndash; Цель {index + 1} &ndash;</div>
  </div>
);

const getGoalsColumns = (idx) => {
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

const goalHeaders = dataJSON.goals_list.map(({ name }, idx) => (
  { active: true, Header: renderGoalName(name, idx), columns: getGoalsColumns(idx) }
));

const columns = [...dataDefinition, ...goalHeaders];

export default function HomePage() {
  const data = [
    Object.assign({}, dataJSON.total, { value: 'Total' }),
    ...dataJSON.content,
  ];

  return (
    <div className="container-fluid">
      <DataTable
        data={data}
        defaultPageSize={dataJSON.content.length + 1}
        columns={columns}
        showPagination={false}
        sortable={false}
      />
    </div>
  );
}
