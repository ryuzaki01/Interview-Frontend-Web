import React, { useEffect } from 'react';
import { object } from 'prop-types';
import { renderRoutes } from 'react-router-config';
import { useLocation } from "react-router-dom";

import Sidebar from '../Sidebar';
import useData from '../../hooks/useData';
import { parseQuery } from '../../core/utils';

import './style.scss';

const Layout = ({ route }) => {
  const [{ app, ...restData }, setData ] = useData();
  const { search, pathname } = useLocation();

  useEffect(() => {
    setData({
      ...restData,
      app: {
        ...app,
        query: parseQuery(search),
        pathname
      }
    });
  }, [search, pathname]);

  return (
    <div className="container-fluid">
      <Sidebar/>
      <div className="wrapper d-flex flex-column min-vh-100">
        {renderRoutes(route.routes)}
        <div className="footer">
          <span>Copyright © 2019 </span>
          <i>PT Moduit Digital Indonesia. </i>
          <span>All rights reserved</span>
        </div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  route: object,
};

export default Layout;
