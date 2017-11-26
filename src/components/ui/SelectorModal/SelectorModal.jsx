import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Checkbox,
  Modal,
} from 'react-bootstrap';

const renderSelectors = (columns, className = '') => (
  columns.map(column => (
    <div className={className} key={column.id}>
      <Checkbox
        inline
        checked={column.active}
        onClick={() => {
        }}
      >
        {(typeof column.Header === 'string') ? column.Header : column.name}
      </Checkbox>
      {
        (column.columns && column.name) ? renderSelectors(column.columns, 'selector-modal__inner') : null
      }
    </div>
  )));

const SelectorModal = ({ isOpen, handleSubmit, handleClose, columns }) => (
  <Modal show={isOpen} onHide={handleClose}>
    <Modal.Body>
      {renderSelectors(columns)}
    </Modal.Body>
    <Modal.Footer>
      <Button bsStyle="primary" onClick={() => handleSubmit}>OK</Button>
      <Button onClick={handleClose}>ОТМЕНИТЬ</Button>
    </Modal.Footer>
  </Modal>
);

SelectorModal.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    active: PropTypes.bool.isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    Header: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  })).isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default SelectorModal;
