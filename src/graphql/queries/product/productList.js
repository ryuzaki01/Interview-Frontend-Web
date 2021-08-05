import {
  GraphQLInt
} from 'graphql';

import { getProductList } from '../../../models';
import { ProductListType } from '../../types';
import { paginate } from '../../../core/utils';

const productList = {
  type: ProductListType,
  args: {
    page: { type: GraphQLInt },
    size: { type: GraphQLInt }
  },
  resolve: (root, args) => {
    const { client } = root || {};
    const { page, size } = args || {};
    let total = 0;

    return getProductList(client)()
      .then(results => {
        total = (results || []).length;

        return results;
      })
      .then(results => paginate(results, page, size))
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

export default productList
