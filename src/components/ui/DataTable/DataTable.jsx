import React from 'react';
import {
  array,
  arrayOf,
  bool,
  node,
  shape,
  string,
} from 'prop-types';
import {
  map,
  filter,
} from 'lodash';
import Loader from 'react-loader';
import { Table } from 'react-bootstrap';
import TableHead from './TableHead';
import BodyRow from './BodyRow';


const DataTable = (props) => {
  const {
    data,
    dataDefenition,
    isLoading,
    ...options
  } = props;
  const activeDataDefenition = filter(dataDefenition, 'active');
  const columns = map(activeDataDefenition, 'title');

  const table = (
    <Table {...options}>
      <TableHead columns={columns} />
      <tbody>
        {data.map((rowData) => (
          <BodyRow
            key={rowData.id}
            dataDefinition={activeDataDefenition}
            rowData={rowData}
          />))}
      </tbody>
    </Table>
  );
  return (
    <Loader loaded={!isLoading}>
      {(!(data && data.length))
        ? <div>No data found</div>
        : table
    }
    </Loader>
  );
};

DataTable.defaultProps = {
  isLoading: false,
};

DataTable.propTypes = {
// eslint-disable-next-line react/forbid-prop-types
  data: array.isRequired,
  dataDefenition: arrayOf(shape({
    title: string.isRequired,
    key: string.isRequired,
    component: node,
  })).isRequired,
  isLoading: bool,
};

export default DataTable;
