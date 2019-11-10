import Fab from '@material-ui/core/Fab';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Flag from 'react-world-flags';

class FilterSelector extends Component {
  constructor(props) {
    super(props);
    const { id, label, active, action, color } = props;
  }

  //shouldComponentUpdate(nextProps, nextState) {}

  render() {
    return (
      <Fab
        key={this.props.id}
        variant="extended"
        size="medium"
        component="a"
        className={'MuiFab-' + this.props.color + ' jukebox-family'}
        onClick={this.props.action}
        clickable="true"
      >
        {this.props.flag ? <Flag code={this.props.label} height="16" /> : this.props.label}
      </Fab>
    );
  }
}

FilterSelector.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  action: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  flag: PropTypes.bool
};

export default FilterSelector;
