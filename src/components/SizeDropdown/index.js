import React, { useState, useEffect } from 'react';
import { number, arrayOf, func } from 'prop-types'
import { useHistory } from 'react-router-dom';

import useData from '../../hooks/useData';

import { stringifyQuery } from '../../core/utils';

import './style.scss';

const DEFAULT_STEPS = [ 5, 6, 7, 8, 9, 10 ];

const SizeDropdown = (props) => {
  const { steps = DEFAULT_STEPS, onChange = () => {} } =  props;
  const [{ app }] = useData();
  const { query, pathname } = app || {};
  const { s: size } = query || {};
  const history = useHistory();
  const [ selected, setSelected ] = useState(size);

  const handleChange = (e) => {
    const { target } = e;
    const { value } = target || {};

    setSelected(value);
    history.push({
      pathname: pathname,
      search: `?${stringifyQuery({
        ...query,
        s: value
      })}`
    });

    onChange(value);
  };

  useEffect(() => {
    setSelected(size);
  }, [size]);

  return (
    <div className="size-dropdown">
      <span>Show</span>
      <select value={selected} onChange={handleChange}>
        {steps.map(step => (
          <option key={`step-${step}`}>{step}</option>
        ))}
      </select>
    </div>
  )
};

SizeDropdown.propTypes = {
  value: number,
  steps: arrayOf(number),
  onChange: func
};

export default SizeDropdown;
