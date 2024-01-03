import React, { useState } from 'react';
import axios from 'axios';
import './AddAdmin.scss';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddAdmin = () => {
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const generatePassword = () => {
    return Math.random().toString(36).slice(-10);
  };

  const handleAddAdmin = async () => {
    if (!agreed) {
      setError('You must agree to grant permissions.');
      return;
    }

    if (!email) {
      setError('Please enter a valid email.');
      return;
    }

    setError('');
    setIsLoading(true);

    const password = generatePassword();
    setGeneratedPassword(password);

    try {
      await axios.post('http://localhost:3001/addAdmin', { email, password });
      toast.success('Admin added successfully');
      setEmail('');
      setAgreed(false);
      navigate("/home/settings");
    } catch (error) {
      setError('Failed to add admin. Email might already be in use.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="add-admin-page">
      <h2>Please enter the new admin's email</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="checkbox-container">
        <input
          type="checkbox"
          checked={agreed}
          onChange={() => setAgreed(!agreed)}
        />
        <label>
          I agree to grant the entered email admin permissions including the ability to view all students, companies, manage accounts, opportunities, and training plans.
        </label>
      </div>
      <button onClick={handleAddAdmin} disabled={isLoading}>
        {isLoading ? 'Adding...' : 'Add'}
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default AddAdmin;
