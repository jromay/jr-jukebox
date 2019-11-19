import Fab from '@material-ui/core/Fab';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import SaveIcon from '@material-ui/icons/Save';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Col, Row } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Swal from 'sweetalert2';

import * as actions from '../../actions';
import { URL_API } from '../../constants';
import { getNameList, getSelectedListContent } from '../../reducers';

class SavePersonalListContainer extends Component {
  handleChange = name => event => {
    const { setNameList } = this.props;
    if (event && event.target) {
      setNameList(event.target.value);
    }
  };

  handleSave = () => {
    const { listContent, nameList, setPersonalList } = this.props;
    let arraySongs = [];
    listContent.map(song => {
      arraySongs.push(song._id);
      return true;
    });
    const url = `${URL_API}lists/`;
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title: nameList, ids: arraySongs })
    })
      .then(data => {
        Swal.fire({
          icon: "success",
          title: "Canción añadida correctamente",
          showConfirmButton: false,
          timer: 1500
        });
        setPersonalList(data);
      })
      .catch(data => {
        Swal.fire({
          title: "Error!",
          text: "Error al guardar la canción.",
          icon: "error",
          confirmButtonText: "Cool"
        });
      });
  };

  render() {
    return (
      <Row className="padding-top-15">
        <Col xs={10}>
          <FormControl variant="outlined">
            <InputLabel htmlFor="component-outlined">
              {"[Nombre de Lista]"}
            </InputLabel>
            <OutlinedInput
              id="component-outlined"
              value={this.props.nameList}
              onChange={this.handleChange("titleList")}
            />
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
      </Row>
    );
  }
}

SavePersonalListContainer.propTypes = {
  nameList: PropTypes.string.isRequired,
  listcontent: PropTypes.array,
  open: PropTypes.bool
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
