import React, { useState } from 'react';
import axios from 'axios';
import './Settings.scss';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../helpers/ThemeContext';
import { useUserType } from '../../../helpers/UserTypeContext';
import { useNavigate } from 'react-router-dom';
import { ConfirmDialog } from 'primereact/confirmdialog';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useLanguage } from '../../../helpers/LanguageContext';

const Settings = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { userType } = useUserType();
  const { t, i18n } = useTranslation();
  const { themeMode, toggleTheme } = useTheme();
  const { changeLang } = useLanguage();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayConfirmDialog, setDisplayConfirmDialog] = useState(false);
  const [accountTypeToDelete, setAccountTypeToDelete] = useState(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  const _id = localStorage.getItem('id');
  const email = localStorage.getItem('email');

  const handleAddAdmin = () => {
    navigate("/home/addadmin");
  };

  const renderAddAdminSection = () => {
    if (userType === 'admin') {
      return (
        <div className='section'>
          <h2>{t('settings.addAdmin')}</h2>
          <Button onClick={handleAddAdmin}>{t('settings.addAdminButton')}</Button>
        </div>
      );
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setErrorMessage(t('allFieldsRequired'));
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setErrorMessage(t('passwordsDontMatch'));
      return;
    }
  
    try {
      setChangingPassword(true);
      const response = await axios.post("http://localhost:3001/changepassword", {
        email: email,
        currentPassword: currentPassword,
        newPassword: newPassword,
      });
  
      if (response.data.success) {
        toast.success(t('settings.passwordUpdated'));
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        setErrorMessage('');
      }
    } catch (error) {
      setErrorMessage(t('currentPasswordIncorrect'));
    } finally {
      setChangingPassword(false);
    }
  };

  const confirmDeleteAccount = (accountType) => {
    setAccountTypeToDelete(accountType);
    setDisplayConfirmDialog(true);
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      let url;
      if (accountTypeToDelete === 'student') {
        url = `http://localhost:3001/studente/${_id}`;
      } else if (accountTypeToDelete === 'company') {
        url = `http://localhost:3001/companye/${_id}`;
      } else if (accountTypeToDelete === 'admin') {
        url = `http://localhost:3001/admine/${_id}`;
      }

      const response = await axios.delete(url);

      if (response.data.success) {
        toast.success(t('settings.deleteAccount'));
        navigate('/login');
      } else {
        console.error(`Failed to delete ${accountTypeToDelete} account`);
        setIsDeleting(false);
      }
    } catch (error) {
      console.error(`Error deleting ${accountTypeToDelete} account`, error);
      setIsDeleting(false);
    } finally {
      setIsDeleting(false);
    }
    setDisplayConfirmDialog(false);
  };

  const handleLanguageChange = (lang) => {
    changeLang(lang);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setErrorMessage("");
  };
  return (
    <div className={`settings-page ${themeMode}`}>
      <div className='section'>
        <h2>{t('settings.changePassword')}</h2>
        <div className="pass dr">
          <input
            type={showCurrentPassword ? "text" : "password"}
            placeholder={t('settings.currentPasswordPlaceholder')}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
          {currentPassword && (
            <FontAwesomeIcon
              icon={showCurrentPassword ? faEyeSlash : faEye}
              className="password-toggle-icon"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            />
          )}
        </div>
        <div className="pass dr">
          <input
            type={showNewPassword ? "text" : "password"}
            placeholder={t('settings.newPasswordPlaceholder')}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          {newPassword && (
            <FontAwesomeIcon
              icon={showNewPassword ? faEyeSlash : faEye}
              className="password-toggle-icon"
              onClick={() => setShowNewPassword(!showNewPassword)}
            />
          )}
        </div>
        <div className="pass dr">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder={t('settings.confirmPasswordPlaceholder')}
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
          />
          {confirmNewPassword && (
            <FontAwesomeIcon
              icon={showConfirmPassword ? faEyeSlash : faEye}
              className="password-toggle-icon"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          )}
        </div>
        <Button onClick={handleChangePassword} disabled={changingPassword}>
          {changingPassword ? t('settings.changingPasswordButton') : t('settings.changePasswordButton')}
        </Button>
        {errorMessage && <p className="error-message">{t(`settings.${errorMessage}`)}</p>}
      </div>

      <div className='section'>
        <h2>{t('settings.language')}</h2>
        <Button className='buttonlang' onClick={() => handleLanguageChange('en')}>{t('settings.English')}</Button>
        <Button className='buttonlang' onClick={() => handleLanguageChange('ar')}>{t('settings.Arabic')}</Button>
      </div>

      <div className='section'>
        <h2>{t('settings.theme')}</h2>
        <Button onClick={toggleTheme}>
          {themeMode === 'light' ? t('settings.ChangeThemeToDarkMode') : t('settings.ChangeThemeToLightMode')}
        </Button>
      </div>
      {renderAddAdminSection()}
      <div className='section'>
        <h2>{t('settings.deleteAccount')}</h2>
        {userType === 'student' && (
          <Button variant='danger' onClick={() => confirmDeleteAccount('student')} disabled={isDeleting}>
            {isDeleting ? t('settings.deleting') : t('settings.DeleteAccountButton')}
          </Button>
        )}
        {userType === 'company' && (
          <Button variant='danger' onClick={() => confirmDeleteAccount('company')} disabled={isDeleting}>
            {isDeleting ? t('settings.deleting') : t('settings.DeleteAccountButton')}
          </Button>
        )}
        {userType === 'admin' && (
          <Button variant='danger' onClick={() => confirmDeleteAccount('admin')} disabled={isDeleting}>
            {isDeleting ? t('settings.deleting') : t('settings.DeleteAccountButton')}
          </Button>
        )}
      </div>
      <ConfirmDialog
        visible={displayConfirmDialog}
        onHide={() => setDisplayConfirmDialog(false)}
        message={t('settings.deleteAccountConfirmation')}
        header={t('settings.deleteAccount')}
        icon="pi pi-exclamation-triangle"
        acceptLabel={t('settings.yes')}
        rejectLabel={t('settings.no')}
        acceptClassName="p-button-danger"
        accept={handleDeleteAccount}
      />
    </div>
  );
};

export default Settings;
