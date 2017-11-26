import React from 'react';
import PropTypes from 'prop-types';


const GoalName = ({ name, index }) => (
  <div>
    <div style={{ color: '#97123F' }}>{name}</div>
    <div style={{ color: '#8A8A8A' }}>&ndash; Цель {index + 1} &ndash;</div>
  </div>
);

GoalName.propTypes = {
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default GoalName;
