import React from 'react';
import './Footer.scss';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../../helpers/ThemeContext';

const Footer = () => {
  const {themeMode} = useTheme();
  const { t } = useTranslation();

  return (
    <footer className={themeMode}>
      <p>{t('footer.copyright')}</p>
    </footer>
  );
};

export default Footer;
