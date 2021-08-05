import moment from 'moment';
import { GraphQLString, GraphQLBoolean } from 'graphql';

const serverTime = {
  type: GraphQLString,
  args: {
    unix: { type: GraphQLBoolean },
  },
  resolve: (root, args) => {
    return args.unix ? moment().unix() : moment().format('YYYY-MM-DD HH:mm:ss Z');
  }
};

export default serverTime;
