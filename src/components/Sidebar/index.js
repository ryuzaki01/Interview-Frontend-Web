import React  from 'react'
import { Link } from '@tiket-com/react-ui';

import Header from '../Header';
import useData from '../../hooks/useData';

import Q1Ico from './assets/Q1.svg';
import Q2Ico from './assets/Q2.svg';

import './style.scss';

// sidebar nav config
const navigation =  [
  {
    title: 'Question 1',
    to: '/',
    icon: <img src={Q1Ico} />
  },
  {
    title: 'Question 2',
    to: '/two',
    icon: <img src={Q2Ico} />
  }
];

const Sidebar = () => {
  const [{ app }] = useData();
  const { pathname } = app || {};

  return (
    <div className="sidebar">
      <Header />
      <ul>
        {navigation.map((nav, i) => {
          const { title, to, icon } = nav || {};
          const isActive = pathname === to;

          return (
            <Link key={`link-${i}`} to={to} className={isActive ? 'active' : ''}>
              <li>
                {icon}
                <span>{title}</span>
              </li>
            </Link>
          )
        })}
      </ul>
    </div>
  )
};

export default Sidebar;
