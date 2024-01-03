import React from 'react';
import { useUserType } from '../../../helpers/UserTypeContext';
import { useEmail } from '../../../helpers/EmailContext';
import { useTranslation } from 'react-i18next';
import './MainInternalPage.scss';
import Admin from "../../../assets/images/Admin.svg"

const MainInternalPage = () => {
  const { t, i18n } = useTranslation();
  const userType = useUserType().userType;
  const { username } = useEmail();
  if(userType === 'company' || userType === "student"){
    const firstName = username.split(' ')[0];
    return (
      <div className="main-internal-page">
        <div className="content">
          <h2>{t('Welcome to your account!')}</h2>
          {userType === 'student' && (
          <p>
              {t('studentGreeting', { firstName })}
          </p>
          )}
          {userType === 'company' && (
          <p>
              {t('companyGreeting', { firstName })}
          </p>
          )}
        </div>
      </div>
    );
  }
  else{
    return (
      <div className="main-internal-page">
        <div className="content">
        {userType === 'admin' && (
          <div className='admin-div'>
          <img src={Admin} alt="admin" className='admin d-none d-sm-block'/>
          </div>
        )}
          <h2>{t('Welcome to your account!')}</h2>
          {userType === 'admin' && (
              <p>
              {t('adminGreeting')}
          </p>
          )}
        </div>
      </div>
    );
  }
};

export default MainInternalPage;
