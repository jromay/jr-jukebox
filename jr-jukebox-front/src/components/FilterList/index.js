import './style.css';

import PropTypes from 'prop-types';
import React from 'react';

import FilterSelector from './FilterSelector';

const FilterList = ({ options, onSelectedOption, onUnselectedOption, colorOn, colorOff, flag }) => {
  const optionsToComponent = options => {
    return options.map(option => (
      <FilterSelector
        key={option['_id']}
        id={option['_id']}
        label={option.name}
        active={option.selected}
        action={option.selected ? () => onUnselectedOption(option.name) : () => onSelectedOption(option.name)}
        color={option.selected ? colorOn : colorOff}
        flag={flag}
      />
    ));
  };

  return <div className="optioncontainer">{optionsToComponent(options || [])}</div>;
};

FilterList.propTypes = {
  options: PropTypes.array.isRequired,
  onSelectedOption: PropTypes.func.isRequired,
  onUnselectedOption: PropTypes.func.isRequired,
  colorOn: PropTypes.string.isRequired,
  colorOff: PropTypes.string.isRequired,
  flag: PropTypes.bool
};

export default FilterList;
