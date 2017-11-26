import React from 'react';
import DataTable from 'components/ui/DataTable/DataTable';

const dataDefinition = [
  {
    id: 1, active: true, title: 'Name', key: 'name',
  },
  {
    id: 2, active: true, title: 'First name', key: 'first-name', parent: 1,
  },
  {
    id: 3, active: true, title: 'Last name', key: 'last-name', parent: 1,
  },
  {
    id: 4, active: true, title: 'Email', key: 'email',
  },
];

const data = [
  { id: 1, name: 'user 1', email: 'test@gmail.com' },
  { id: 2, name: 'user 2', email: 'temp@gmail.com' },
];

export default function HomePage() {
  return (
    <div className="container">
      <DataTable data={data} dataDefenition={dataDefinition} />
    </div>
  );
}
