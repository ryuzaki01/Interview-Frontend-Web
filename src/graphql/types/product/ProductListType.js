import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLString
} from 'graphql';

import ProductType from './ProductType';

const ProductDataType = new GraphQLObjectType({
  name: 'ProductData',
  fields: {
    items: { type: new GraphQLList(ProductType)},
    total: { type: GraphQLInt },
  }
});

const ProductListType = new GraphQLObjectType({
  name:'ProductList',
  fields: {
    status: { type: GraphQLInt },
    message: { type: GraphQLString },
    data: { type: ProductDataType }
  }
});

export default ProductListType;
