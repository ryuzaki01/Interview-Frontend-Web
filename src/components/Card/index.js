import React from 'react';
import { oneOfType, node, string, element } from 'prop-types';

import "./style.scss";

const Card = function Card(props) {
  const { children, className, ...restProps } = props || {};

  return (
    <div className={`card ${className ? className : ''}`} {...restProps}>
      {children}
    </div>
  );
};

Card.propTypes = {
  children: oneOfType([string, node, element]),
  className: string
};

export default Card;
