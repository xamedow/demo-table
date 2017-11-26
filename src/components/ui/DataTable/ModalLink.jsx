import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showModal } from 'components/routes/home/tableDuck';


const ModalLink = (props) => (
  <a href="/" onClick={props.showModal}>{props.value}</a>
);

ModalLink.propTypes = {
  value: PropTypes.string.isRequired,
  showModal: PropTypes.func.isRequired,
};
export default connect(null, { showModal })(ModalLink);
