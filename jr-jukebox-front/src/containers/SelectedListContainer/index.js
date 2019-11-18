import './style.css';

import Fab from '@material-ui/core/Fab';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../actions';
import { getActualIndex, getPersonalList, getSelectedListContent } from '../../reducers';

const columns = [
  {
    id: "title",
    label: "Lista de Reproducción",
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

class SelectedListContainer extends Component {
  handleExchangePosition = index => this.props.exchangePositions(index);
  handleRemoveSong = index => this.props.removeSong(index);
  handleSetSong = index => this.props.setActualSong(index);
  render() {
    return (
      <div className="tableWrapper">
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {
                <TableCell
                  key={columns[0].id}
                  align={columns[0].align}
                  style={{ minWidth: columns[0].minWidth }}
                  className={columns[0].classHeader}
                  colSpan="2"
                >
                  {columns[0].preHeader +
                    columns[0].label +
                    columns[0].postHeader}
                </TableCell>
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.selectedListContent.map((row, index) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.file}
                  className={
                    index === this.props.selectedIndex ? "selected" : ""
                  }
                >
                  {columns.map(column => {
                    const value = column.pre + row[column.id] + column.post;
                    return (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        className={column.class + " padding1"}
                      >
                        {column.action ? (
                          <Fab
                            className="padding1"
                            variant="extended"
                            aria-label="like"
                            color="secondary"
                            size="small"
                            onClick={() => {
                              this.handleRemoveSong(index);
                            }}
                          >
                            <DeleteForeverIcon />
                          </Fab>
                        ) : (
                          <span
                            onClick={() => {
                              this.handleSetSong(index);
                            }}
                          >
                            {value}
                          </span>
                        )}
                        {column.action ? (
                          <Fab
                            className="padding1"
                            variant="extended"
                            aria-label="like"
                            color="primary"
                            disabled={
                              index < this.props.selectedListContent.length - 1
                                ? false
                                : true
                            }
                            size="small"
                            onClick={() => {
                              this.handleExchangePosition(index);
                            }}
                          >
                            <ArrowDropDownIcon />
                          </Fab>
                        ) : (
                          ""
                        )}
                        {column.action ? (
                          <Fab
                            className="padding1"
                            variant="extended"
                            aria-label="like"
                            color="primary"
                            disabled={index !== 0 ? false : true}
                            size="small"
                            onClick={() => {
                              this.handleExchangePosition(index - 1);
                            }}
                          >
                            <ArrowDropUpIcon />
                          </Fab>
                        ) : (
                          ""
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

SelectedListContainer.propTypes = {
  selectedListContent: PropTypes.array.isRequired,
  listSelected: PropTypes.string.isRequired,
  selectedIndex: PropTypes.number.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  selectedListContent: getSelectedListContent(state) || [],
  listSelected: getPersonalList(state),
  selectedIndex: getActualIndex(state) || 0
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedListContainer);
