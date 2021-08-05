import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} from 'graphql';

const ProductType = new GraphQLObjectType({
  name:'Product',
  fields: {
    id: { type: GraphQLInt },
    category: { type: GraphQLInt },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    footer: { type: GraphQLString },
    tags: { type: new GraphQLList(GraphQLString)},
    createdAt: { type: GraphQLString },
  }
});

export default ProductType;
