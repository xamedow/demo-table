import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DataTable from 'components/ui/DataTable';
import dataJSON from 'data.json';
import SelectorModal from 'components/ui/SelectorModal';
import { setColumns, updateColumns, hideModal } from './tableDuck';

class HomePage extends React.Component {
  componentDidMount() {
    this.props.getColumns(dataJSON);
  }

  data = [
    Object.assign({}, dataJSON.total, { value: 'Total' }),
    ...dataJSON.content,
  ];

  render() {
    const { columns, loading, isModalOpen } = this.props;
    return (
      <div className="container-fluid">
        <DataTable
          data={this.data}
          defaultPageSize={dataJSON.content.length + 1}
          columns={columns}
          showPagination={false}
          sortable={false}
          isLoading={loading}
        />
        <SelectorModal
          isOpen={isModalOpen}
          handleClose={this.props.hideModal}
          handleSubmit={this.props.updateColumns}
          columns={columns}
        />
      </div>
    );
  }
}

HomePage.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    active: PropTypes.bool.isRequired,
    Header: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  })).isRequired,
  getColumns: PropTypes.func.isRequired,
  updateColumns: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return { ...state.table };
}

export default connect(mapStateToProps, { getColumns: setColumns, updateColumns, hideModal })(HomePage);
