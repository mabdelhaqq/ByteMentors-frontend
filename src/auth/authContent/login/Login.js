import { useState, useEffect } from 'react';
import axios from 'axios';
import './Login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { useEmail } from '../../../helpers/EmailContext';
import { useUserType } from '../../../helpers/UserTypeContext';

const Login = () => {
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { email, setLoggedInEmail } = useEmail();
  const { setUser } = useUserType();
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInEmail('');
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3001/login', {
        email: email,
        password: password,
      });
      if (response.data.success) {
        const nameResponse = await axios.get(`http://localhost:3001/getname?email=${email}`);
        const name = nameResponse.data.name;
        const nameResponset = await axios.get(`http://localhost:3001/getcity?email=${email}`);
        const city = nameResponset.data.city;
        const nameResponseth = await axios.get(`http://localhost:3001/getphonenumber?email=${email}`);
        const phoneNumber = nameResponseth.data.phoneNumber;
        const nameResponsef = await axios.get(`http://localhost:3001/getdescription?email=${email}`);
        const description = nameResponsef.data.description;
        const nameResponsefi = await axios.get(`http://localhost:3001/getlinkedin?email=${email}`);
        const linkedin = nameResponsefi.data.linkedin;
        const nameResponses = await axios.get(`http://localhost:3001/getprofileimage?email=${email}`);
        const profileImage = nameResponses.data.profileImage;
        const nameResponsid = await axios.get(`http://localhost:3001/getid?email=${email}`);
        const _id = nameResponsid.data._id;
        const nameResponsete = await axios.get(`http://localhost:3001/getgithub?email=${email}`);
        const github = nameResponsete.data.github;
        const nameResponseel = await axios.get(`http://localhost:3001/getgender?email=${email}`);
        const gender = nameResponseel.data.gender;
        const nameResponsen = await axios.get(`http://localhost:3001/getgraduate?email=${email}`);
        const graduate = nameResponsen.data.graduate;
        const nameResponsese = await axios.get(`http://localhost:3001/getuniversity?email=${email}`);
        const university = nameResponsese.data.university;
        const nameResponsee = await axios.get(`http://localhost:3001/getgraduationyear?email=${email}`);
        const graduationYear = nameResponsee.data.graduationyear;
        const nameResponsetw = await axios.get(`http://localhost:3001/getpreferredfield?email=${email}`);
        const preferredField = nameResponsetw.data.preferredField;
        const nameResponsethth = await axios.get(`http://localhost:3001/getskill?email=${email}`);
        const skills = nameResponsethth.data.skill;
        const nameResponsecv = await axios.get(`http://localhost:3001/getcv?email=${email}`);
        const cv = nameResponsecv.data.cv;
        setLoggedInEmail(email, name, city, phoneNumber, description, linkedin, profileImage, _id, 
          github, gender, graduate, university, graduationYear, preferredField, skills, cv);
        setUser(response.data.userType);
        navigate('/home');
      } else {
        setErrorMessage('Email or password incorrect');
      }
    } catch (error) {
      setErrorMessage('An error occurred while logging in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form col-12 col-lg-8">
        <h2>Login to your account</h2>
        <p>login using social networks</p>
        <div className="social-buttons">
          <FontAwesomeIcon icon={faFacebook} className='social-button facebook' />
          <FontAwesomeIcon icon={faGoogle} className='social-button gmail' />
          <FontAwesomeIcon icon={faLinkedinIn} className='social-button lin' />
        </div>
        <p className="or-divider">or</p>
        <input
          type="text"
          placeholder="Your email"
          value={email}
          onChange={(e) => setLoggedInEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="password-options">
          <Link to='/login/forgetemail' className='forget'><p>Forget password?</p></Link>
        </div>
        <button className="signin-button" onClick={handleLogin} disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
      <div className="signup-discover col-12 col-lg-4">
        <h2>New here?</h2>
        <p>Sign up and discover a great world of tech opportunities!</p>
        <Link to='/login/option' className='link-register'><button className="register-button">Register</button></Link>
      </div>
    </div>
  );
};

export default Login;