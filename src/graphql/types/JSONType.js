import {
  GraphQLScalarType,
  Kind,
  GraphQLError
} from 'graphql';

const JsonType = new GraphQLScalarType({
  name: 'JsonType',
  serialize: value => {
    return value;
  },
  parseValue: value => {
    return value;
  },
  parseLiteral: ast => {
    if (ast.kind !== Kind.OBJECT) {
      throw new GraphQLError(`Query error: Can only parse object but got a: ${ast.kind}`, [ast]);
    }

    return ast.value;
  }
});

export default JsonType;
