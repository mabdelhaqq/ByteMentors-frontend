import { createContext, useContext, useState } from 'react';

const EmailContext = createContext();

export const EmailProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [city, setCity] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [description, setDescription] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [_id, set_id] = useState('');
  const [github, setGithub] = useState('');
  const [gender, setGender] = useState('');
  const [graduate, setGraduate] = useState(false);
  const [university, setUniversity] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [preferredField, setPreferredField] = useState('');
  const [skills, setSkills] = useState([]);
  const [cv, setCv] = useState('');

  const setLoggedInEmail = (
    userEmail,
    username,
    city,
    phoneNumber,
    description,
    linkedin,
    profileImage,
    _id,
    github,
    gender,
    graduate,
    university,
    graduationYear,
    preferredField,
    skills,
    cv,
  ) => {
    setEmail(userEmail);
    setUsername(username);
    setCity(city);
    setPhoneNumber(phoneNumber);
    setDescription(description);
    setLinkedin(linkedin);
    setProfileImage(profileImage);
    set_id(_id);
    setGithub(github);
    setGender(gender);
    setGraduate(graduate);
    setUniversity(university);
    setGraduationYear(graduationYear);
    setPreferredField(preferredField);
    setSkills(skills);
    setCv(cv);
  };

  return (
    <EmailContext.Provider value={{ 
      email,
      username,
      city,
      phoneNumber,
      description,
      linkedin,
      profileImage,
      _id,
      github,
      gender,
      graduate,
      university,
      graduationYear,
      preferredField,
      skills,
      cv,
      setLoggedInEmail
    }}>
      {children}
    </EmailContext.Provider>
  );
};

export const useEmail = () => {
  const context = useContext(EmailContext);
  if (!context) {
    throw new Error('useEmail must be used within an EmailProvider');
  }
  return context;
};
