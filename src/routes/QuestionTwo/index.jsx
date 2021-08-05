import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

import Card from '../../components/Card';
import Product from '../../components/Product';
import SearchInput from '../../components/SearchInput';
import Pagination from '../../components/Pagination';
import SizeDropdown from '../../components/SizeDropdown';
import useData from '../../hooks/useData';

import { stringifyQuery } from '../../core/utils';

import productSearchQuery from './productSearchQuery.graphql';

const QuestionTwo = () => {
  const [{ app }] = useData();
  const history = useHistory();
  const { query, pathname } = app || {};
  const { p: page = 1, s: size = 5, search: searchParam } = query || {};
  const [ search, setSearch ] = useState(searchParam || '');
  const { data, loading } = useQuery(productSearchQuery, {
    ssr: true,
    variables: {
      search: search,
      page: parseInt(page, 10) || 1,
      size: parseInt(size, 10) || 5,
    },
  });

  const { productSearch: productSearchResult } = data || {};
  const { data: productSearchData } = productSearchResult || {};
  const { items, total } = productSearchData || {};

  useEffect(() => {
    setSearch(searchParam);
  }, [searchParam]);

  return (
    <div className="content">
      <div className="heading">
        <h1>Question 2</h1>
        <SearchInput value={search} placeholder="Search by product name" onChange={(val) => {
          setSearch(val);
          const newQuery = {
            ...query,
            search: val
          };

          if (val === '') {
            delete newQuery.search;
          }

          history.push({
            pathname: pathname,
            search: `?${stringifyQuery(newQuery)}`
          });
        }}/>
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

export default QuestionTwo;
