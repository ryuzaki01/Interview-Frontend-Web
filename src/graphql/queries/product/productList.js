import {
  GraphQLList
} from 'graphql';

import { getProductList } from '../../../models';
import { ProductType } from '../../types';

const productList = {
  type: new GraphQLList(ProductType),
  resolve: (root) => {
    const { client } = root || {};

    return getProductList(client)()
  }
};

export default productList
