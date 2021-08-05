import React from 'react';

const Product = ({ data }) => {
  const { id, title, category, description, tags } = data || {};
  const initial = (title || '').split(' ').map(t => t[0].toUpperCase()).join('').slice(0, 2);

  return (
    <tr>
      <td className="text-left">
        <i className="initial">{initial}</i>
        <span>{title}</span>
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
