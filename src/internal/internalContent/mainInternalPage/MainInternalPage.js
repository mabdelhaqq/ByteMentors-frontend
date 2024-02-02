import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUserType } from '../../../helpers/UserTypeContext';
import { useTranslation } from 'react-i18next';
import './MainInternalPage.scss';
import Admin from "../../../assets/images/Admin.svg";
import Spinner from '../../../assets/spinner/Spinner';

const MainInternalPage = () => {
  const { t } = useTranslation();
  const userType = useUserType().userType;
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsername = async () => {
      setIsLoading(true);
      const userId = localStorage.getItem('id');
      try {
        const response = await axios.get(`http://localhost:3001/username/${userId}`);
        setUsername(response.data.username);
      } catch (error) {
        console.error('Error fetching username', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsername();
  }, []);

  const firstName = username.split(' ')[0];

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="main-internal-page">
      <div className="content">
        {userType === 'admin' && (
          <div className='admin-div'>
            <img src={Admin} alt="admin" className='admin d-none d-sm-block'/>
          </div>
        )}
        <h2>{t('mainInternalPage.welcome')}</h2>
        {userType === 'student' && <p>{t('mainInternalPage.studentGreeting', { firstName })}</p>}
        {userType === 'company' && <p>{t('mainInternalPage.companyGreeting', { firstName })}</p>}
        {userType === 'admin' && <p>{t('mainInternalPage.adminGreeting')}</p>}
      </div>
    </div>
  );
};

export default MainInternalPage;