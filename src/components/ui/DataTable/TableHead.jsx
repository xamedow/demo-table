import React from 'react';
import {
  arrayOf,
  string,
} from 'prop-types';

const TableHead = ({
  columns,
}) => (
  <thead>
    <tr>
      {React.Children.map(columns, (column) => {
        return <th>{column}</th>;
      })}
    </tr>
  </thead>
);

TableHead.propTypes = {
  columns: arrayOf(string).isRequired,
};

export default TableHead;
