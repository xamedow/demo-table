import React from 'react';
import PropTypes from 'prop-types';
import ModalLink from './ModalLink';


const ModalLinkWrapper = ({ value }) => (
  <ModalLink value={value} />
);

ModalLinkWrapper.propTypes = {
  value: PropTypes.string.isRequired,
};
export default ModalLinkWrapper;
