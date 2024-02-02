import React, { useState } from 'react';
import axios from 'axios';
import './AddAdmin.scss';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AddAdmin = () => {
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { t } = useTranslation();

  const generatePassword = () => {
    return Math.random().toString(36).slice(-10);
  };

  const handleAddAdmin = async () => {
    if (!agreed) {
      setError('agreementError');
      return;
    }

    if (!email) {
      setError('emailError');
      return;
    }

    setError('');
    setIsLoading(true);

    const password = generatePassword();

    try {
      await axios.post('http://localhost:3001/addAdmin', { email, password });
      toast.success(t('Admin added successfully'));
      setEmail('');
      setAgreed(false);
      navigate("/home/settings");
    } catch (error) {
      setError('addError');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="add-admin-page">
      <h2>{t('addAdmin.title')}</h2>
      <input
        type="email"
        placeholder={t('addAdmin.emailPlaceholder')}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="checkbox-container">
        <input
          type="checkbox"
          checked={agreed}
          onChange={() => setAgreed(!agreed)}
        />
        <label>{t('addAdmin.agreeLabel')}</label>
      </div>
      <button onClick={handleAddAdmin} disabled={isLoading}>
        {isLoading ? t('addAdmin.addingButton') : t('addAdmin.addButton')}
      </button>
      {error && <p className="error">{t(`addAdmin.${error}`)}</p>}
    </div>
  );
};

export default AddAdmin;