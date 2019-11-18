import './style.css';

import Fab from '@material-ui/core/Fab';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AddCircle from '@material-ui/icons/AddCircle';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../actions';
import { URL_API } from '../../constants';
import { getFilteredList, getFilterQuery } from '../../reducers';

const columns = [
  {
    id: "title",
    label: "Resultados de la búsqueda",
    minWidth: "80%",
    pre: "<",
    post: ">",
    preHeader: "[",
    postHeader: "]",
    class: "tipo-list padding1",
    classHeader: "header-table tipo-header padding1",
    align: "center"
  },
  {
    id: "code",
    label: "",
    minWidth: "20%",
    pre: 0,
    post: 0,
    preHeader: "",
    postHeader: "",
    class: "tipo-list padding1",
    action: true,
    align: "right",
    classHeader: "header-table tipo-list padding1"
  }
];

class FilteredListContainer extends Component {
  componentDidMount() {
    this.loadFilteredList("");
  }

  loadFilteredList(queryString) {
    const { setFilteredList } = this.props;
    const url = `${URL_API}songs/?${queryString}`;
    setFilteredList([]);
    this.loadProcess(url, 50, 0);
  }

  loadProcess(url, limit, skip) {
    const { addFilteredList } = this.props;
    const nextUrl = `${url}$limit=${limit}&$skip=${skip}`;
    fetch(nextUrl)
      .then(data => data.json())
      .then(data => {
        addFilteredList(data.data);
        if (data.skip + data.limit < data.total) {
          this.loadProcess(url, limit, skip + limit);
        }
      });
  }

  handleSelectedOption = optionType => this.props.addOption(optionType);

  handleUnselectedOption = optionType => this.props.removeOption(optionType);

  handleAddSong = song => this.props.addPersonalListContent(song);

  componentWillReceiveProps(nextProps) {
    if (nextProps.filterQuery !== this.props.filterQuery) {
      this.loadFilteredList(nextProps.filterQuery);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  render() {
    return (
      <div className="tableWrapper">
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  className={column.classHeader}
                >
                  {column.preHeader + column.label + column.postHeader}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.filterList.map(row => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                  {columns.map(column => {
                    const value = column.pre + row[column.id] + column.post;
                    return (
                      <TableCell
                        key={column.id + row._id}
                        align={column.align}
                        className={column.class}
                      >
                        {column.action ? (
                          <Fab
                            className="padding1"
                            variant="extended"
                            size="small"
                            aria-label="like"
                            color="primary"
                            onClick={() => {
                              this.handleAddSong(row);
                            }}
                          >
                            <AddCircle />
                          </Fab>
                        ) : (
                          value
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }
}

FilteredListContainer.propTypes = {
  filterList: PropTypes.array.isRequired,
  filterQuery: PropTypes.string.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  filterList: getFilteredList(state),
  filterQuery: getFilterQuery(state)
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilteredListContainer);
