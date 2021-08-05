import {
  GraphQLString,
  GraphQLInt,
  GraphQLList
} from 'graphql';

import { getProductSearch } from '../../../models';
import { ProductType } from '../../types';

const filterSearch = (products, search) => {
  return (products || []).filter(product => {
    if (!search) {
      return true;
    }

    const { title } = product || {};
    const searchRegX = new RegExp(`^${search}`);

    return searchRegX.test(title);
  })
};

const paginate = (items, page, size) => {
  return (items || []).slice((page - 1) * size, page * size);
};

const productSearch = {
  type: new GraphQLList(ProductType),
  args: {
    search: { type: GraphQLString },
    page: { type: GraphQLInt },
    size: { type: GraphQLInt }
  },
  resolve: (root, args) => {
    const { page, size, search } = args || {};
    const { client } = root || {};

    return getProductSearch(client)()
      .then(products => filterSearch(products, search))
      .then(products => paginate(products, page, size));
  }
};

export default productSearch
