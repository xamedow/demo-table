import React from 'react';
import {
  array,
  arrayOf,
  bool,
  shape,
} from 'prop-types';
import {
  filter,
} from 'lodash';
import Loader from 'react-loader';
import ReactTable from 'react-table';
import 'react-table/react-table.css';


const DataTable = (props) => {
  const {
    columns,
    isLoading,
    ...options
  } = props;
  const activeColumns = filter(columns, 'active');

  const table = (
    <ReactTable
      className="-striped -highlight"
      columns={activeColumns}
      {...options}
    />
  );
  return (
    <Loader loaded={!isLoading}>
      {(!(options.data && options.data.length))
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
  columns: arrayOf(shape({
    active: bool.isRequired,
  })).isRequired,
  isLoading: bool,
};

export default DataTable;
