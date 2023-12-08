import React, { useState } from 'react';
import axios from 'axios';
import './ForgetReset.scss';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ForgetReset = ({ email }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); 

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords don't match. Please try again.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3001/resetpassword", {
        email,
        password: newPassword,
      });
      if (response.data.success) {
        navigate("/login");
        toast.success("The password has been reset successfully!")
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="forget-reset-container">
      <div className="forget-reset-form">
        <h2>Reset Your Password</h2>
        <p>Enter your new password below:</p>
        <form>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit" onClick={handleResetPassword}>
            Reset Password
          </button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default ForgetReset;
