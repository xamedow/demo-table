import React from 'react';
import PropTypes from 'prop-types';


const Icon = ({ src, title }) => (
  <img src={src} alt={title} />
);

Icon.defaultProps = {
  title: null,
};
Icon.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string,
};

export default Icon;
