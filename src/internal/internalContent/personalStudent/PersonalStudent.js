import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useEmail } from '../../../helpers/EmailContext';
// import { MultiSelect } from 'react-multi-select-component';
import cities from '../../../helpers/cities';
import axios from 'axios';

const PersonalStudent = () => {
  const {
    email,
    username,
    city,
    phoneNumber,
    description,
    linkedin,
    github,
    gender,
    profileImage,
    graduate,
    university,
    graduationYear,
    // preferredField,
    // skills,
    setLoggedInEmail,
  } = useEmail();

  const [editMode, setEditMode] = useState(false);
  // const [selectedSkills, setSelectedSkills] = useState([]);
  const [editedInfo, setEditedInfo] = useState({
    name: username,
    city,
    phoneNumber,
    graduate,
    university,
    graduationYear,
    bio: description,
    linkedin,
    github,
    gender,
    // preferredField,
    // skills,
    profileImage,
  });

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelClick = () => {
    setEditMode(false);
    setEditedInfo({
      name: username,
      city,
      phoneNumber,
      bio: description,
      linkedin,
      profileImage,
      github,
      gender,
      university,
      graduate, 
      graduationYear,
    });
  };
  const handleSaveClick = async () => {
    try {
        // const editedGraduationYear = typeof editedInfo.graduationYear === 'string'
        // ? parseInt(editedInfo.graduationYear)
        // : editedInfo.graduationYear;
        // const editedGraduate = editedInfo.graduate === "true";
      const response = await axios.post('http://localhost:3001/updateStudentInfo', {
        email: email,
        ...editedInfo,
        // graduationYear: editedGraduationYear,
        // graduate: editedGraduate, // استخدام القيمة المحولة
        // skills: selectedSkills.map((skill) => skill.label),
      });
  
      if (response.data.success) {
        setEditMode(false);
        setLoggedInEmail(
          email,
          editedInfo.name,
          editedInfo.city,
          editedInfo.phoneNumber,
          editedInfo.bio,
          editedInfo.linkedin,
          editedInfo.profileImage,
          editedInfo.github,
          editedInfo.university,
          editedInfo.graduationYear,
          editedInfo.graduate,
          editedInfo.gender,
        //   editedInfo.preferredField || [],
        //   editedInfo.skills || [],  // تحقق من وجود القيمة قبل استخدامها
        );
      } else {
        console.error('Failed to update student info');
      }
    } catch (error) {
      console.error('Error updating student info', error);
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  // const handleSkillsChange = (selected) => {
  //   setSelectedSkills(selected);
  // };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setEditedInfo((prevInfo) => ({
          ...prevInfo,
          profileImage: reader.result,
        }));
      };

      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    setEditedInfo({
      name: username,
      city,
      phoneNumber,
      graduate,
      university,
      graduationYear,
      bio: description,
      linkedin,
      github,
      gender,
    //   preferredField,
    //   skills,
      profileImage,
    });

    // setSelectedSkills(
    //   skills.map((skill) => ({ label: skill, value: skill }))
    // );
  }, [email, username, city, phoneNumber, description, linkedin, github, gender, graduate, university, graduationYear, profileImage]);

  return (
    <Container className="personal-student-page">
      <Row>
        <Col md={12}>
          <div className="info-section">
            {!editMode && (
              <>
                <Button
                  variant="info"
                  onClick={handleEditClick}
                  className="edit-profile-button"
                >
                  Edit Profile
                </Button>
                {profileImage && (
                  <div className="profile-image-preview-container">
                    <img
                      src={editedInfo.profileImage}
                      alt="Profile Preview"
                      className="profile-image-preview"
                    />
                  </div>
                )}
                <h2>{editedInfo.name}</h2>
                <p>Email: {email}</p>
                <p>Location: {editedInfo.city}</p>
                <p>Phone Number: {editedInfo.phoneNumber}</p>
                {editedInfo.linkedin && (
                  <div className="sub-info">
                    <p>LinkedIn: </p>
                    <a
                      href={editedInfo.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {editedInfo.linkedin}
                    </a>
                  </div>
                )}
                {editedInfo.github && (
                  <div className="sub-info">
                    <p>Github: </p>
                    <a
                      href={editedInfo.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {editedInfo.github}
                    </a>
                  </div>
                )}
                {editedInfo.gender && <p>Gender: {editedInfo.gender}</p>}
                {editedInfo.graduate === 'true'? (<p>Graduate: Yes</p>):(<p>Graduate: No</p>)}
                {editedInfo.university && (
                  <p>University: {editedInfo.university}</p>
                )}
                {editedInfo.graduationYear && (
                  <p>Graduation Year: {editedInfo.graduationYear}</p>
                )}
                {/* {editedInfo.preferredField && (
                  <p>Preferred Field: {editedInfo.preferredField.join(', ')}</p>
                )}
                {editedInfo.skills && (
                  <p>Skills: {editedInfo.skills.join(', ')}</p>
                )} */}
                {editedInfo.bio && (
                  <>
                    <hr />
                    <p>{editedInfo.bio}</p>
                  </>
                )}
              </>
            )}
          </div>
          {editMode && (
            <Form>
              <Form.Group controlId="formProfileImage">
                <Form.Label>Profile Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {editedInfo.profileImage && (
                  <img
                    src={editedInfo.profileImage}
                    alt="Profile Preview"
                    className="profile-image-preview"
                  />
                )}
              </Form.Group>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={editedInfo.name}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  as="select"
                  name="city"
                  value={editedInfo.city}
                  onChange={handleInputChange}
                >
                  <option value="">Select City</option>
                  {cities.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formPhoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter phone number"
                  name="phoneNumber"
                  value={editedInfo.phoneNumber}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formBio">
                <Form.Label>Bio</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter bio"
                  name="bio"
                  value={editedInfo.bio}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formLinkedin">
                <Form.Label>LinkedIn</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter LinkedIn URL"
                  name="linkedin"
                  value={editedInfo.linkedin || ''}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formLinkedin">
                <Form.Label>Github</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Github URL"
                  name="github"
                  value={editedInfo.github || ''}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formGender">
                <Form.Label>Gender</Form.Label>
                <Form.Control
                    as="select"
                    name="gender"
                    value={editedInfo.gender || ''}
                    onChange={handleInputChange}
                >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </Form.Control>
                </Form.Group>
                <Form.Group controlId="formGraduate">
                <Form.Label>Graduate</Form.Label>
                <Form.Control
                    as="select"
                    name="graduate"
                    value={editedInfo.graduate ? 'true' : 'false'}
                    onChange={handleInputChange}
                    >
                    <option value="">Select</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                    </Form.Control>
                </Form.Group>
              <Form.Group controlId="formUniversity">
                <Form.Label>University</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your university"
                  name="university"
                  value={editedInfo.university || ''}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formGraduationYear">
                <Form.Label>Graduation Year</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter graduation year"
                  name="graduationYear"
                  value={editedInfo.graduationYear || ''}
                  onChange={handleInputChange}
                />
              </Form.Group>
              {/* <Form.Group controlId="formPreferredField">
                <Form.Label>Preferred Field</Form.Label>
                <MultiSelect
                  options={[
                    { label: 'Front End', value: 'front end' },
                    { label: 'Back End', value: 'back end' },
                    // ... إضافة خيارات أخرى
                  ]}
                  value={editedInfo.preferredField}
                  onChange={(selected) =>
                    setEditedInfo((prevInfo) => ({
                      ...prevInfo,
                      preferredField: selected.map((field) => field.label),
                    }))
                  }
                  labelledBy={"Select"}
                />
              </Form.Group> */}
              {/* <Form.Group controlId="formSkills">
                <Form.Label>Skills</Form.Label>
                <MultiSelect
                  options={[
                    { label: 'HTML5', value: 'HTML5' },
                    { label: 'CSS3', value: 'CSS3' },
                    // ... إضافة خيارات أخرى
                  ]}
                  value={selectedSkills}
                  onChange={handleSkillsChange}
                  labelledBy={"Select"}
                />
              </Form.Group> */}
              <Button variant="primary" onClick={handleSaveClick}>
                Save
              </Button>
              <Button variant="secondary" onClick={handleCancelClick}>
                Cancel
              </Button>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default PersonalStudent;
