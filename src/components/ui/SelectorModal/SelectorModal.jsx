import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Button,
  Checkbox,
  MenuItem,
  Modal,
} from 'react-bootstrap';

class SelectorModal extends React.Component {
  renderSelectors = () => {
    return this.props.columns.map(column => (
      <MenuItem>
        <Checkbox
          checked={column.active}
          onClick={() => {}}
          />
        {column.Header}
      </MenuItem>
    ))
  };

  render() {
    const { isOpen, handleSubmit, handleClose } = this.props;
    return (
      <Modal show={isOpen} onHide={handleClose}>
        <Modal.Body>
          <ul>
            {this.renderSelectors()}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => handleSubmit}>OK</Button>
          <Button onClick={handleClose}>ОТМЕНИТЬ</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

SelectorModal.propTypes = {
  // myProp: PropTypes.string.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    state,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectorModal);
