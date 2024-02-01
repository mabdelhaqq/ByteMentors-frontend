import React, { useState } from 'react';
import axios from 'axios';
import './ForgetCode.scss';

const ForgetCode = ({ email, setStep }) => {
  const [code, setCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [verifying, setVerifying] = useState(false);

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    try {
      setVerifying(true);
      const response = await axios.post("http://localhost:3001/forgetcode/verify", { email, code });
      if (response.data.success) {
        setStep(3);
      } else {
        setErrorMessage("Invalid verification code. Please try again.");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrorMessage("Invalid verification code. Please try again.");
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="forget-email-container">
      <div className="forget-email-form">
        <h2>Verification Code</h2>
        <p>You should have received a verification code. Enter it below:</p>
        <form>
          <input
            type="text"
            placeholder="Your code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button type="submit" onClick={handleVerifyCode} disabled={verifying}>
            {verifying ? "Verifying..." : "Verify Code"}
          </button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default ForgetCode;
