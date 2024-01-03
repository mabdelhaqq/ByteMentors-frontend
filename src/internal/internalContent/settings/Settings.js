import React, { useState } from 'react';
import axios from 'axios';
import './Settings.scss';
import { toast } from 'react-toastify';
import { useEmail } from '../../../helpers/EmailContext';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../helpers/ThemeContext';
import { useUserType } from '../../../helpers/UserTypeContext';
import { useNavigate } from 'react-router-dom';
import { ConfirmDialog } from 'primereact/confirmdialog';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Button } from 'react-bootstrap';



const Settings = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { email, _id } = useEmail();
  const { userType } = useUserType();
  const { t, i18n } = useTranslation();
  const { themeMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayConfirmDialog, setDisplayConfirmDialog] = useState(false);
  const [accountTypeToDelete, setAccountTypeToDelete] = useState(null);



  const handleAddAdmin = () => {
    navigate("/home/addadmin");
  };
  const renderAddAdminSection = () => {
    if (userType === 'admin') {
      return (
        <div className='section'>
          <h2>Add Admin</h2>
          <Button onClick={handleAddAdmin}>Click here to add a new admin</Button>
        </div>
      );
    }
  };
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
        toast.success('Your account has been successfully deleted');
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
        <Button onClick={handleChangePassword}>{t('change password')}</Button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>

      <div className='section'>
        <h2>{t('Language')}</h2>
        <Button className='buttonlang' onClick={() => handleLanguageChange('en')}>{t('English')}</Button>
        <Button className='buttonlang' onClick={() => handleLanguageChange('ar')}>{t('عربي')}</Button>
      </div>

      <div className='section'>
        <h2>{t('theme')}</h2>
        <Button onClick={toggleTheme}>
          {themeMode === 'light' ? t('Change Theme to Dark mode') : t('Change Theme to Light mode')}
        </Button>
      </div>
      {renderAddAdminSection()}
      <div className='section'>
        <h2>Delete Account</h2>
        {userType === 'student' && (
          <Button variant='danger' onClick={() => confirmDeleteAccount('student')} disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Click here to delete your account'}
          </Button>
        )}
        {userType === 'company' && (
          <Button variant='danger' onClick={() => confirmDeleteAccount('company')} disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Click here to delete your account'}
          </Button>
        )}
        {userType === 'admin' && (
          <Button variant='danger' onClick={() => confirmDeleteAccount('admin')} disabled={isDeleting} className='delete'>
            {isDeleting ? 'Deleting...' : 'Click here to delete your account'}
          </Button>
        )}
      </div>
      <ConfirmDialog
        visible={displayConfirmDialog}
        onHide={() => setDisplayConfirmDialog(false)}
        message="Are you sure you want to delete your account?"
        header="Confirmation"
        icon="pi pi-exclamation-triangle"
        acceptLabel="Yes"
        rejectLabel="No"
        acceptClassName="p-button-danger"
        accept={handleDeleteAccount}
      />
    </div>
  );
};

export default Settings;
