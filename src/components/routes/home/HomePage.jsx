import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DataTable from 'components/ui/DataTable';
import dataJSON from 'data.json';
// import SelectorModal from 'component/ui/SelectorModal/SelectorModal';
import { getColumns } from './tableDuck';

class HomePage extends React.Component {
  // state = {
  //   isModalOpen: false,
  // };

  componentDidMount() {
    this.props.getColumns(dataJSON);
  }

  data = [
    Object.assign({}, dataJSON.total, { value: 'Total' }),
    ...dataJSON.content,
  ];

  // handleModalClose = () => this.setState({ isModalOpen: false });

  render() {
    const { columns } = this.props;
    return (
      <div className="container-fluid">
        <DataTable
          data={this.data}
          defaultPageSize={dataJSON.content.length + 1}
          columns={columns}
          showPagination={false}
          sortable={false}
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
};

function mapStateToProps(state) {
  return { ...state.table };
}

export default connect(mapStateToProps, { getColumns })(HomePage);
