import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './components/logo/Logo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBell } from '@fortawesome/free-solid-svg-icons';
import './Header.scss';
import { useUserType } from '../../../../helpers/UserTypeContext';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../../helpers/ThemeContext';

const Header = () => {
  const navigate = useNavigate();
  const [isDropDownMenu, setDropDownMenu] = useState(false);
  const [isDropDownNotification, setDropDownNotification] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { userType } = useUserType();
  const _id = localStorage.getItem('id');
  const { t } = useTranslation();
  const {themeMode} = useTheme();


  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const studentId = _id.toString();
      const response = await axios.get(`http://localhost:3001/notificationss?studentId=${studentId}`);
      const sortedNotifications = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setNotifications(sortedNotifications);
      const unreadNotifications = sortedNotifications.filter(notification => !notification.isRead).length;
      setUnreadCount(unreadNotifications);
    } catch (error) {
      console.error('Error fetching notifications', error);
    }
  };

  const handleNotificationClick = async (notificationId) => {
    try {
      await axios.post(`http://localhost:3001/notifications/markOpened/${notificationId}`);
      setDropDownNotification(false);
      fetchNotifications();
      if (userType === 'student'){
        navigate("/home/selected");
      } else if(userType === 'company'){
        navigate("/home/myopp");
      }
    } catch (error) {
      console.error('Error updating notification status:', error);
    }
  };

  const toggleMenu = () => {
    setDropDownMenu(!isDropDownMenu);
  };

  const toggleNotification = async () => {
    setDropDownNotification(!isDropDownNotification);
    if (!isDropDownNotification) {
      try {
        await axios.post(`http://localhost:3001/notifications/markAllAsRead/${_id}`);
        fetchNotifications();
      } catch (error) {
        console.error('Error marking all notifications as read:', error);
      }
    }
  };

  const getMenuItems = () => {
    switch (userType) {
      case 'admin':
        return (
          <>
            <div className="dropdown-itemmenu" onClick={() => { navigate('/home/allstudent'); setDropDownMenu(false); }}>{t('header.students')}</div>
            <div className="dropdown-itemmenu" onClick={() => { navigate('/home/allcompanies'); setDropDownMenu(false); }}>{t('header.companies')}</div>
            <div className="dropdown-itemmenu" onClick={() => { navigate('/home/allopp'); setDropDownMenu(false); }}>{t('header.opportunities')}</div>
            <div className="dropdown-itemmenu" onClick={() => { navigate('/home/allplans'); setDropDownMenu(false); }}>{t('header.trainingPlans')}</div>
            <div className="dropdown-itemmenu" onClick={() => { navigate('/home/settings'); setDropDownMenu(false); }}>{t('header.settings')}</div>
            <div className="dropdown-itemmenu" onClick={() => { navigate('/login/'); setDropDownMenu(false); }}>{t('header.logOut')}</div>
          </>
        );
      case 'student':
        return (
          <>
            <div className="dropdown-itemmenu" onClick={() => { navigate('/home/personalstudent'); setDropDownMenu(false); }}>{t('header.personalPage')}</div>
            <div className="dropdown-itemmenu" onClick={() => { navigate('/home/opp'); setDropDownMenu(false); }}>{t('header.trainingOpportunities')}</div>
            <div className="dropdown-itemmenu" onClick={() => { navigate('/home/companies'); setDropDownMenu(false); }}>{t('header.companies')}</div>
            <div className="dropdown-itemmenu" onClick={() => { navigate('/home/allplans'); setDropDownMenu(false); }}>{t('header.trainingPlans')}</div>
            <div className="dropdown-itemmenu" onClick={() => { navigate('/home/settings'); setDropDownMenu(false); }}>{t('header.settings')}</div>
            <div className="dropdown-itemmenu" onClick={() => { navigate('/login/'); setDropDownMenu(false); }}>{t('header.logOut')}</div>
          </>
        );
      case 'company':
        return (
          <>
            <div className="dropdown-itemmenu" onClick={() => { navigate('/home/personalcomapny'); setDropDownMenu(false); }}>{t('header.personalPage')}</div>
            <div className="dropdown-itemmenu" onClick={() => { navigate('/home/myopp'); setDropDownMenu(false); }}>{t('header.myOpportunities')}</div>
            <div className="dropdown-itemmenu" onClick={() => { navigate('/home/settings'); setDropDownMenu(false); }}>{t('header.settings')}</div>
            <div className="dropdown-itemmenu" onClick={() => { navigate('/login/'); setDropDownMenu(false); }}>{t('header.logOut')}</div>
          </>
        );
      default:
        return null;
    }
  };

  const getNotificationItems = () => {
    if (notifications.length === 0) {
      return <div className="notification-item no-notifications"><p>No notifications</p></div>;
    } else {
      return notifications.map(notification => (
        <div 
          key={notification._id} 
          className={`notification-item ${notification.isRead ? '' : 'unread'} ${!notification.opened ? 'not-opened' : ''}`}
          onClick={() => handleNotificationClick(notification._id)}
        >
          <h4>{notification.type}</h4>
          <p>{notification.message}</p>
          <small>{formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}</small>
        </div>
      ));
    }
  };
  

  return (
    <header className={`in-header ${themeMode}`}>
      <FontAwesomeIcon icon={faBars} className='col-1 btn-menu d-block d-lg-none' onClick={toggleMenu}/>
      {isDropDownMenu && (
        <div className="dropdown-menumenu">
          {getMenuItems()}
        </div>
      )}
      <div className='col-10 col-lg-11'>
        <Logo/>
      </div>
      {userType !== "admin" &&(
      <FontAwesomeIcon icon={faBell} className='col-1 notification' onClick={toggleNotification}/>
      )}
      {unreadCount > 0 && (
        <div className="notification-count">
          {unreadCount}
        </div>
      )}
      {isDropDownNotification && (
        <div className="dropdown-notification">
        {getNotificationItems()}
      </div>
      )}
    </header>
  );
}

export default Header;