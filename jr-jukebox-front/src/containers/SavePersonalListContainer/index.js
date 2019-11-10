import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import PropTypes from 'prop-types';
import React, { Component, useState } from 'react';
import { Col, Row } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../actions';
import { getNameList, getSelectedListContent } from '../../reducers';

class SavePersonalListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
  handleChange = name => event => {
    const { setNameList } = this.props;
    console.log(event);
    if (event && event.target) {
      setNameList(event.target.value);
    }
  };

  handleSave = () => {
    const { listContent, nameList, setPersonalList } = this.props;
    const refreshList = nameList;
    let arraySongs = [];
    listContent.map(song => {
      arraySongs.push(song._id);
    });
    const url = `${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/lists/`;
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: nameList, ids: arraySongs })
    }).then(data => {
      this.handleOpen();
      // Refrescar Lists
      // Cargar List
      setPersonalList(data);
    });
  };

  handleOpen = () => {
    this.state = {
      open: true
    };
  };

  handleClose = (event, reason) => {
    this.state = {
      open: false
    };
  };

  render() {
    return (
      <Row className="padding-top-15">
        <Col xs={10}>
          <FormControl variant="outlined">
            <InputLabel ref="RR" htmlFor="component-outlined">
              {'[Nombre de Lista]'}
            </InputLabel>
            <OutlinedInput id="component-outlined" value={this.props.nameList} onChange={this.handleChange('titleList')} />
          </FormControl>
        </Col>
        <Col xs={2} className="padding-top-15">
          <Fab
            variant="extended"
            aria-label="like"
            color="primary"
            onClick={() => {
              this.handleSave();
            }}
          >
            <SaveIcon />
          </Fab>
        </Col>

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={this.props.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id'
          }}
          message={<span id="message-id">Note archived</span>}
          action={[
            <IconButton key="close" aria-label="close" color="inherit" onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>
          ]}
        />
      </Row>
    );
  }
}

SavePersonalListContainer.propTypes = {
  nameList: PropTypes.string.isRequired,
  listcontent: PropTypes.array.isRequired,
  open: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    nameList: getNameList(state),
    listContent: getSelectedListContent(state),
    open: false
  };
}

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SavePersonalListContainer);
