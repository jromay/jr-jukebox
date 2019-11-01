import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Col, Row } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../actions';
import { setOptions } from '../../actions';
import FilterList from '../../components/FilterList';
import { DECADES, LETTERS, TAGS } from '../../constants';
import { getDecades, getLetters, getOptions, getTags } from './../../reducers';

class FilterListContainer extends Component {
  options = [];

  constructor(props) {
    super(props);
    props.setOptions(LETTERS);
    props.setOptions(TAGS);
    props.setOptions(DECADES);
  }
  componentDidMount() {
    this.props.setOptions(LETTERS);
    this.props.setOptions(TAGS);
    this.props.setOptions(DECADES);
  }

  handleSelectedOption = optionType => this.props.addOption(optionType);

  handleUnselectedOption = optionType => this.props.removeOption(optionType);

  componentWillReceiveProps(nextProps) {}

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentDidUpdate(prevProps, prevState) {}

  render() {
    return (
      <div>
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
  optionListLetters: PropTypes.array.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  optionListTags: getOptions(state)(TAGS),
  optionListDecades: getOptions(state)(DECADES),
  optionListLetters: getOptions(state)(LETTERS),
  getOptions: getOptions,
  stateGlobal: state
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterListContainer);
