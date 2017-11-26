import React from 'react';
import { string } from 'prop-types';


const Icon = ({ src, title }) => (
  <img src={src} alt={title} />
);

Icon.defaultProps = {
  title: null,
};
Icon.propTypes = {
  src: string.isRequired,
  title: string,
};

export default Icon;
