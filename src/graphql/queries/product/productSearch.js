import {
  GraphQLString,
  GraphQLInt
} from 'graphql';

import { getProductSearch } from '../../../models';
import { ProductListType } from '../../types';
import { filterSearch, paginate } from '../../../core/utils';

const productSearch = {
  type: ProductListType,
  args: {
    search: { type: GraphQLString },
    page: { type: GraphQLInt },
    size: { type: GraphQLInt }
  },
  resolve: (root, args) => {
    const { page, size, search } = args || {};
    const { client } = root || {};
    let total = 0;

    return getProductSearch(client)()
      .then(products => filterSearch(products, search))
      .then(results => {
        total = (results || []).length;

        return results;
      })
      .then(products => paginate(products, page, size))
      .then(results => ({
        status: 200,
        message: 'success',
        data: {
          items: results,
          total
        }
      }))
      .catch(e => ({
        status: e.statusCode,
        message: e.message,
        data: {
          items: null,
          total
        }
      }));
  }
};

export default productSearch
