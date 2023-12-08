import React from 'react';
import { useUserType } from '../../../helpers/UserTypeContext';
import { useEmail } from '../../../helpers/EmailContext';
import { useTranslation } from 'react-i18next';
import './MainInternalPage.scss';

const MainInternalPage = () => {
    const { t, i18n } = useTranslation();
  const userType = useUserType().userType;
  const { username } = useEmail();
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
};

export default MainInternalPage;
