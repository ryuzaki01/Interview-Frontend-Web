import loadable from '@loadable/component';

import Layout from '../components/Layout';

const QuestionOne = loadable(() => import(/* webpackChunkName: "QuestionOne" */ './QuestionOne'));
const QuestionTwo = loadable(() => import(/* webpackChunkName: "QuestionTwo" */ './QuestionTwo'));
const NotFound = loadable(() => import(/* webpackChunkName: "NotFound" */ './NotFound'));

export default [
  {
    component: Layout,
    routes: [
      {
        path: "/",
        exact: true,
        component: QuestionOne
      },
      {
        path: "/two",
        exact: true,
        component: QuestionTwo
      },
      {
        path: "*",
        component: NotFound
      }
    ]
  }
];
