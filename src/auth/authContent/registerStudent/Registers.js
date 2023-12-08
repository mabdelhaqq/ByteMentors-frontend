import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Registers.scss';
import axios from 'axios';
import cities from '../../../helpers/cities';
import { toast } from 'react-toastify';


const Registers = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [graduate, setGraduate] = useState(false);
  const [university, setUniversity] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [gender, setGender] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [formSubmitting, setFormSubmitting] = useState(false);

  const createStudent = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    try {
      setFormSubmitting(true);
      const response = await axios.post("http://localhost:3001/createstudent", {
        name: name,
        email: email,
        password: password,
        city: city,
        phoneNumber: phoneNumber,
        graduate: graduate,
        university: university,
        graduationYear: graduationYear,
        gender: gender,
      });
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setCity("");
      setPhoneNumber("");
      setGraduate(false);
      setUniversity("");
      setGraduationYear("");
      setGender("");
      setEmailError("");
      setPasswordError("");
      navigate('/login');
      toast.success("You have been registered successfully!");
    } catch (error) {
      console.error("Error registering student:", error);
      if (error.response && error.response.status === 400 && error.response.data.error) {
        setEmailError(error.response.data.error);
      } else {
        setEmailError("An error occurred while registering. Please try again.");
      }
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <div className="register-container">
      <h2>Student Registration</h2>
      <form onSubmit={createStudent}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {emailError && <div className="error-message">{emailError}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onBlur={() => {
              if (password !== confirmPassword) {
                setPasswordError("Passwords do not match");
              } else {
                setPasswordError("");
              }
            }}
            required
          />
          {passwordError && <div className="error-message">{passwordError}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <select
            id="city"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            <option value="">Select Location</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
            <option value="">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              name="isGraduated"
              checked={Boolean(graduate)}
              onChange={(e) => setGraduate(Boolean(e.target.checked))}
            />
            Graduated
          </label>
        </div>
        {graduate && (
          <>
            <div className="form-group">
              <label htmlFor="university">University</label>
              <input
                type="text"
                id="university"
                name="university"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="graduationYear">Graduation Year</label>
              <input
                type="text"
                id="graduationYear"
                name="graduationYear"
                value={graduationYear}
                onChange={(e) => setGraduationYear(e.target.value)}
              />
            </div>
          </>
        )}
        <button type="submit" disabled={formSubmitting}>
          {formSubmitting ? "Submitting..." : "Register"}
        </button>
      </form>
      <p>
        Already have an account?{' '}
        <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Registers;
