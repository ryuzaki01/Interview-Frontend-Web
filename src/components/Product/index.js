import React from 'react';

import './style.scss';

const Product = ({ data }) => {
  const { id, title, category, description, tags } = data || {};
  const initial = (title || '').split(' ').map(t => t[0].toUpperCase()).join('').slice(0, 2);

  return (
    <tr className="product">
      <td className="text-left">
        <div className="title">
          <i className="initial">{initial}</i>
          <span>{title}</span>
        </div>
      </td>
      <td className="text-center">
        {id}
      </td>
      <td className="text-center">
        {i18n(`category.${category}`)}
      </td>
      <td className="text-center">
        {description}
      </td>
      <td>
        <ul>
          {(tags || []).map((t, i) => (
            <li key={`product-tag-${id}-${i}`}>{t}</li>
          ))}
        </ul>
      </td>
    </tr>
  )
};

export default Product;
