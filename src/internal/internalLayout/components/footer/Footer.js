import React from 'react';
import './Footer.scss';
import { useTheme } from '../../../../helpers/ThemeContext';

const Footer = () => {
  const { themeMode } = useTheme();

  return (
    <footer className={themeMode}>
      <p>&copy;Copyright 2023. All Rights Reserved. | Byte Mentor</p>
    </footer>
  );
};

export default Footer;
