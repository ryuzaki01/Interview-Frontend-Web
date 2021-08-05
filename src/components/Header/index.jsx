import React from 'react';
import { Input, Icon, Button, Modal } from '@tiket-com/react-ui';

import moduitLogo from '../../assets/logo.svg';
import './style.scss';

const Header = () => {
  return (
    <div className="header">
      <img src={moduitLogo} />
    </div >
  );
};

export default Header;
