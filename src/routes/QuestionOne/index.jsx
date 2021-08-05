import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import Card from '../../components/Card';
import Product from '../../components/Product';
import Pagination from '../../components/Pagination';
import SizeDropdown from '../../components/SizeDropdown';
import useData from '../../hooks/useData';

import productListQuery from './productListQuery.graphql';

const QuestionOne = () => {
  const [{ app }] = useData();
  const { query } = app || {};
  const { p: page = 1, s: size = 5 } = query || {};
  const { data, loading } = useQuery(productListQuery, {
    ssr: true,
    variables: {
      page: parseInt(page, 10) || 1,
      size: parseInt(size, 10) || 5,
    },
  });

  const { productList: productListResult } = data || {};
  const { data: productListData } = productListResult || {};
  const { items, total } = productListData || {};

  return (
    <div className="content">
      <div className="heading">
        <h1>Question 1</h1>
      </div>
      <Card style={{ marginTop: 30 }}>
        <table className="table" style={{ marginBottom: 30 }}>
          <thead>
            <tr>
              <th className="text-left">Product Name</th>
              <th>Product Code</th>
              <th>Category</th>
              <th>Description</th>
              <th>Tags</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5}>Loading...</td>
              </tr>
            ) : (items || []).map((item, i) => <Product key={`product-${item.id}`} data={item} />)}
          </tbody>
        </table>
        <div className="bottom-control">
          <Pagination lastPage={Math.floor(total / size)}/>
          <SizeDropdown/>
        </div>
      </Card>
    </div>
  );
};

export default QuestionOne;
