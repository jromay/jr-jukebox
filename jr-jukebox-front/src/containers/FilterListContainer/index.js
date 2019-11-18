import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Col, Row } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../actions';
import FilterList from '../../components/FilterList';
import { DECADES, LANGUAGES, LETTERS, TAGS } from '../../constants';
import { getOptions } from './../../reducers';

class FilterListContainer extends Component {
  options = [];

  constructor(props) {
    super(props);
    props.setOptions(LETTERS);
    props.setOptions(TAGS);
    props.setOptions(DECADES);
    props.setOptions(LANGUAGES);
  }
  componentDidMount() {}

  handleSelectedOption = optionType => this.props.addOption(optionType);

  handleUnselectedOption = optionType => this.props.removeOption(optionType);

  componentWillReceiveProps(nextProps) {}

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentDidUpdate(prevProps, prevState) {}

  render() {
    return (
      <div className="padding-top-15">
        <Row>
          <Col xs={12}>
            <FilterList
              className="optioncontainer"
              options={this.props.optionListTags || []}
              onSelectedOption={this.handleSelectedOption(TAGS)}
              onUnselectedOption={this.handleUnselectedOption(TAGS)}
              colorOn="primary"
              colorOff="default"
            ></FilterList>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <FilterList
              className="optioncontainer"
              options={this.props.optionListDecades}
              onSelectedOption={this.handleSelectedOption(DECADES)}
              onUnselectedOption={this.handleUnselectedOption(DECADES)}
              colorOn="primary"
              colorOff="default"
            ></FilterList>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <FilterList
              className="optioncontainer"
              options={this.props.optionListLanguages || []}
              onSelectedOption={this.handleSelectedOption(LANGUAGES)}
              onUnselectedOption={this.handleUnselectedOption(LANGUAGES)}
              colorOn="primary"
              colorOff="default"
              flag={true}
            ></FilterList>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <FilterList
              className="optioncontainer"
              options={this.props.optionListLetters}
              onSelectedOption={this.handleSelectedOption(LETTERS)}
              onUnselectedOption={this.handleUnselectedOption(LETTERS)}
              colorOn="primary"
              colorOff="default"
            ></FilterList>
          </Col>
        </Row>
      </div>
    );
  }
}

FilterListContainer.propTypes = {
  optionListTags: PropTypes.array.isRequired,
  optionListDecades: PropTypes.array.isRequired,
  optionListLetters: PropTypes.array.isRequired,
  optionListLanguages: PropTypes.array.isRequired,
  getOptions: PropTypes.func.isRequired,
  stateGlobal: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  optionListTags: getOptions(state)(TAGS),
  optionListDecades: getOptions(state)(DECADES),
  optionListLetters: getOptions(state)(LETTERS),
  optionListLanguages: getOptions(state)(LANGUAGES),
  getOptions: getOptions,
  stateGlobal: state
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterListContainer);
