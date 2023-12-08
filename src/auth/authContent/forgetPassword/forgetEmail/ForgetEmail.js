import React, { useState } from 'react';
import axios from 'axios';
import './ForgetEmail.scss';
import ForgetCode from '../forgetCode/ForgetCode';
import ForgetReset from '../forgetReset/ForgetReset';

const ForgetEmail = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSendCode = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/forgetpassword", { email });
      if (response.data.success) {
        setStep(2);
      } else {
        setErrorMessage("Email not found. Please enter a valid email.");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrorMessage("Email not found. Please enter a valid email.");
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="forget-email-container">
      <div className="forget-email-form">
        {step === 1 && (
          <>
            <h2>Forget Your Password?</h2>
            <p>Enter your email to reset your password.</p>
            <form>
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" onClick={handleSendCode}>
                Send Code
              </button>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </>
        )}
        {step === 2 && <ForgetCode email={email} setStep={setStep} />}
        {step === 3 && <ForgetReset email={email} />}
      </div>
    </div>
  );
};

export default ForgetEmail;
