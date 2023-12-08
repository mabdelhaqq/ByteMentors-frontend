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
  const [github, setGithub] = useState('');
  const [university, setUniversity] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [graduate, setGraduate] = useState(false);
  const [gender, setGender] = useState('');
  const [preferredField, setPreferredField] = useState([]);
  const [skills, setSkills] = useState([]);

  const setLoggedInEmail = (
    userEmail,
    username,
    city,
    phoneNumber,
    description,
    linkedin,
    profileImage,
    github,
    university,
    graduationYear,
    graduate,
    gender,
    preferredField,
    skills
  ) => {
    setEmail(userEmail);
    setUsername(username);
    setCity(city);
    setPhoneNumber(phoneNumber);
    setDescription(description);
    setLinkedin(linkedin);
    setProfileImage(profileImage);
    setGithub(github);
    setUniversity(university);
    setGraduationYear(graduationYear);
    setGraduate(graduate);
    setGender(gender);
    setPreferredField(preferredField);
    setSkills(skills);
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
      github,
      university,
      graduationYear,
      graduate,
      gender,
      preferredField,
      skills,
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
