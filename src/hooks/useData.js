import React, { useContext } from 'react';
import { LocalDataContext } from '../core/context';

const useData = () => useContext(LocalDataContext);

export default useData;
