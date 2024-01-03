import React from 'react';
import './AppMenu.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faMagnifyingGlassLocation, faBriefcase, faFileCode, faGears, faRightFromBracket, faGraduationCap, faChartPie } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../../helpers/ThemeContext';
import { useUserType } from '../../../../helpers/UserTypeContext';
const menuItems = [
  {
    icon: faUser,
    title: 'Personal page',
    path: '/home/personalstudent',
    forStudent: true,
    forCompany: false,
    forAdmin: false,
  },
  {
    icon: faUser,
    title: 'Personal page',
    path: '/home/personalcomapny',
    forStudent: false,
    forCompany: true,
    forAdmin: false,
  },
  {
    icon: faMagnifyingGlassLocation,
    title: 'Training opportunities',
    path: '/home/opp',
    forStudent: true,
    forCompany: false,
    forAdmin: false,
  },
  {
    icon: faGraduationCap,
    title: 'Students',
    path: '/home/allstudent',
    forStudent: false,
    forCompany: false,
    forAdmin: true,
  },
  {
    icon: faBriefcase,
    title: 'Companies',
    path: '/home/allcompanies',
    forStudent: false,
    forCompany: false,
    forAdmin: true,
  },
  {
    icon: faMagnifyingGlassLocation,
    title: 'Opportunities',
    path: '/home/allopp',
    forStudent: false,
    forCompany: false,
    forAdmin: true,
  },
  {
    icon: faMagnifyingGlassLocation,
    title: 'My opportunities',
    path: '/home/myopp',
    forStudent: false,
    forCompany: true,
    forAdmin: false,
  },
  {
    icon: faBriefcase,
    title: 'Companies',
    path: '/home/companies',
    forStudent: true,
    forCompany: false,
    forAdmin: false,
  },
  {
    icon: faFileCode,
    title: 'Training plans',
    path: '/home/allplans',
    forStudent: true,
    forCompany: false,
    forAdmin: true,
  },
  {
    icon: faGears,
    title: 'Settings',
    path: '/home/settings',
    forStudent: true,
    forCompany: true,
    forAdmin: true,
  },
  {
    icon: faRightFromBracket,
    title: 'Log out',
    path: '/login/',
    forStudent: true,
    forCompany: true,
    forAdmin: true,
  },
];

const AppMenu = () => {
  const { t, i18n } = useTranslation();
  const { themeMode } = useTheme();
  const { userType } = useUserType();

  return (
    <aside className={`app-menu ${themeMode}`}>
      {menuItems.map((item, index) => (
        (userType === 'student' && item.forStudent) || (userType === 'company' && item.forCompany) || (userType === 'admin' && item.forAdmin) ? (
          <Link to={item.path} className="link-menu" key={index}>
            <div className="item-links-menu">
              <FontAwesomeIcon icon={item.icon} className="item-icon-menu" />
              <span className="title-link-menu">{t(item.title)}</span>
            </div>
          </Link>
        ) : null
      ))}
    </aside>
  );
};

export default AppMenu;
