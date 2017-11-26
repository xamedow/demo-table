import React from 'react';
import {
  arrayOf,
  node,
  number,
  shape,
  string,
} from 'prop-types';
import { get } from 'lodash';

/**
 * Table body row constructor component,
 * which may take a custom component from data defenition prop.
 * @param rowData - object which fields are cells values.
 * @param dataDefinition - array with cells definitions.
 * @constructor
 */
const BodyRow = ({ rowData, dataDefinition }) => (
  <tr>
    {dataDefinition.map(({ key, component: Component }) => {
      if (Component) {
        return (
          <Component
            key={key}
            rowData={rowData}
          />);
      }
      return <td key={key}>{get(rowData, key)}</td>;
    })}
  </tr>
);

BodyRow.propTypes = {
  dataDefinition: arrayOf(shape({
    component: node,
    title: string.isRequired,
    key: string.isRequired,
  })).isRequired,
  rowData: shape({
    id: number.isRequired,
  }).isRequired,
};

export default BodyRow;
