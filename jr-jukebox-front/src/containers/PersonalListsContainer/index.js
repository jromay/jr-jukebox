import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Col, Row } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../actions';
import { URL_API } from '../../constants';
import { getPersonalList, getPersonalLists } from '../../reducers';

class PersonalListsContainer extends Component {
  constructor(props) {
    super(props);
    this.loadPersonalLists();
  }

  loadPersonalLists() {
    const { setPersonalLists } = this.props;
    const url = `${URL_API}lists/?`;
    setPersonalLists([]);

    this.loadProcess(url, 50, 0);
  }

  loadProcess(url, limit, skip) {
    const { addPersonalLists } = this.props;
    const nextUrl = `${url}$limit=${limit}&$skip=${skip}`;
    fetch(nextUrl)
      .then(data => data.json())
      .then(data => {
        addPersonalLists(data.data);
        if (data.skip + data.limit < data.total) {
          this.loadProcess(url, limit, skip + limit);
        }
      });
  }

  loadSelectedLists(id) {
    const { setPersonalListContent } = this.props;
    setPersonalListContent([]);
    if (id !== "") {
      const url = `${URL_API}lists/${id}`;
      fetch(url)
        .then(data => data.json())
        .then(data => {
          setPersonalListContent(data.data);
        });
    }
  }

  handleChange = name => event => {
    const { setPersonalList, setNameList } = this.props;
    setPersonalList(event.target.value);
    if (event.target.value !== "") {
      setNameList(event.target.selectedOptions[0].label);
    } else {
      setNameList("");
    }
    this.loadSelectedLists(event.target.value);
  };

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.selectedId !== "" &&
      nextProps.selectedId !== this.props.selectedId
    ) {
      let reload = true;
      this.props.personalLists.map(list => {
        if (list._id === nextProps.selectedId) {
          reload = false;
        }
        return reload;
      });
      if (reload) {
        this.loadPersonalLists();
      }
    }
  }

  render() {
    return (
      <Row>
        <Col xs={12}>
          <FormControl
            variant="filled"
            className="padding-top-15 min-width-100"
            width="100%"
          >
            <InputLabel htmlFor="filled-lists">{"[Mis Listas]"}</InputLabel>
            <Select
              native
              value={this.props.selectedId}
              onChange={this.handleChange("list")}
              inputProps={{
                name: "Mi Lista",
                id: "filled-lists"
              }}
              width="100%"
            >
              <option value="" />
              {this.props.personalLists.map(list => {
                return (
                  <option value={list._id} key={list._id}>
                    {list.title}
                  </option>
                );
              })}
            </Select>
          </FormControl>
        </Col>
      </Row>
    );
  }
}

PersonalListsContainer.propTypes = {
  personalLists: PropTypes.array.isRequired,
  selectedId: PropTypes.string.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  personalLists: getPersonalLists(state) || [],
  selectedId: getPersonalList(state)
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalListsContainer);
