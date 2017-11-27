import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Checkbox,
  Modal,
} from 'react-bootstrap';


export default class SelectorModal extends React.Component {
  static propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({
      active: PropTypes.bool.isRequired,
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      Header: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    })).isRequired,
    isOpen: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    updateColumn: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
  };

  renderSelectors = (columns, className = '') => (
    columns.map(column => (
      (column.id !== 'value') &&
      <div className={className} key={column.id}>
        <Checkbox
          inline
          checked={column.active}
          onChange={() => {
            this.props.updateColumn(column.id, !column.active);
          }}
        >
          {(typeof column.Header === 'string') ? column.Header : column.name}
        </Checkbox>
        {
          (column.columns && column.name) ? this.renderSelectors(column.columns, 'selector-modal__inner') : null
        }
      </div>
    )));

  render() {
    const {
      isOpen,
      handleSubmit,
      handleClose,
      columns,
    } = this.props;
    return (
      <Modal show={isOpen} onHide={handleClose}>
        <Modal.Body>
          {this.renderSelectors(columns)}
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="primary" onClick={() => handleSubmit(columns)}>OK</Button>
          <Button onClick={handleClose}>ОТМЕНИТЬ</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

