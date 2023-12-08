import React, { useState } from 'react';
import axios from 'axios';
import './Settings.scss';
import { toast } from 'react-toastify';
import { useEmail } from '../../../helpers/EmailContext';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../helpers/ThemeContext';

const Settings = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { email } = useEmail();
  const { t, i18n } = useTranslation();
  const { themeMode, toggleTheme } = useTheme();

  const handleChangePassword = async () => {
    if(!currentPassword||!newPassword||!confirmNewPassword){
        setErrorMessage(t("All fields are required"));
        return;
    }
    if (newPassword !== confirmNewPassword) {
      setErrorMessage(t("Passwords don't match. Please try again."));
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/changepassword", {
        email: email,
        currentPassword: currentPassword,
        newPassword: newPassword,
      });

      if (response.data.success) {
        toast.success(t('Password updated successfully'));
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        setErrorMessage('');
      }
    } catch (error) {
      setErrorMessage(t('Current Password incorrect'));
    }
  };

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setErrorMessage("");
  };

  return (
    <div className={`settings-page ${themeMode}`}>
      <div className='section'>
        <h2>{t('change password')}</h2>
        <input
          type="password"
          placeholder={t('current password')}
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder={t('new password')}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder={t('confirm new password')}
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          required
        />
        <button onClick={handleChangePassword}>{t('change password')}</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>

      <div className='section'>
        <h2>{t('Language')}</h2>
        <button className='buttonlang' onClick={() => handleLanguageChange('en')}>{t('English')}</button>
        <button className='buttonlang' onClick={() => handleLanguageChange('ar')}>{t('عربي')}</button>
      </div>

      <div className='section'>
        <h2>{t('theme')}</h2>
        <button onClick={toggleTheme}>
          {themeMode === 'light' ? t('Change Theme to Dark mode') : t('Change Theme to Light mode')}
        </button>
      </div>
    </div>
  );
};

export default Settings;
