import React, { useState, useEffect } from "react";
import { renderRoutes } from "react-router-config";
import { BrowserRouter, useLocation } from "react-router-dom";

import { LocalDataContext } from './core/context';
import { parseQuery } from './core/utils';
import routes from "./routes";

const App = () => {
  const [ localData, setLocalData ] = useState(window.__data);

  return (
    <LocalDataContext.Provider value={[localData, setLocalData]}>
      <BrowserRouter>
        {renderRoutes(routes)}
      </BrowserRouter>
    </LocalDataContext.Provider>
  );
};

export default App;
