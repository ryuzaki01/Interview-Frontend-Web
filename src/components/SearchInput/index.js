import React, { useState, forwardRef } from 'react';
import { string, func } from 'prop-types';

import { debounce } from '../../core/utils';

import searchIcon from './assets/search-ico.svg';

import './style.scss';

const SearchInput = (props) => {
  const { value, onChange, ...restProps } = props;
  const [search, setSearch] = useState(value || '');

  const handleChange = (e) => {
    const { target } = e || {};
    const { value } = target || {};

    setSearch(value);
    debounce(() => onChange(value), 1000);
  };

  return (
    <div className="search-input">
      <input value={search} onChange={handleChange} {...restProps} />
      <img src={searchIcon} />
    </div>
  )
};

SearchInput.propTypes = {
  value: string,
  onChange: func
};

export default forwardRef((props, ref) => <SearchInput ref={ref} {...props} />);
