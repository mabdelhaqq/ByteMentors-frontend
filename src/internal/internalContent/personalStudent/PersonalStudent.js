import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useEmail } from '../../../helpers/EmailContext';
import cities from '../../../helpers/cities';
import axios from 'axios';
import MultiSelect from "multiselect-react-dropdown";
import "./PersonalStudent.scss"

const PersonalStudent = () => {
  const {
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
    setLoggedInEmail,
  } = useEmail();

  const [editMode, setEditMode] = useState(false);
  const [optione, setOptione] = useState(["HTML5", "CSS3", "JavaScript", "BootStrap5", "SASS"]);
  const [editedInfo, setEditedInfo] = useState({
    name: username,
    city,
    phoneNumber,
    bio: description,
    linkedin,
    profileImage,
    github,
    gender,
    graduate,
    university,
    graduationYear,
    preferredField,
    skills,
    cv,
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
      graduate, 
      university,
      graduationYear,
      preferredField,
      skills,
      cv,
    });
  };

  const handleSaveClick = async () => {
    try {
      const response = await axios.post('http://localhost:3001/updateStudentInfo', {
        email: email,
        ...editedInfo,
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
          _id,
          editedInfo.github,
          editedInfo.gender,
          editedInfo.graduate,
          editedInfo.university,
          editedInfo.graduationYear,
          editedInfo.preferredField,
          editedInfo.skills,
          editedInfo.cv,
        );
      } else {
        console.error('Failed to update student info');
      }
    } catch (error) {
      console.error('Error updating student info', error);
    }
  };

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };
  const handleCVUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedInfo((prevInfo) => ({
          ...prevInfo,
          cv: reader.result,
        }));
      };
      reader.onerror = (error) => {
        console.error('Error reading file:', error);
      };
  
      reader.readAsDataURL(file);
    }
  };
  const downloadCV = () => {
    const link = document.createElement('a');
    link.href = editedInfo.cv;
    link.download = "CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleSkillsChange = (selectedList, selectedItem) => {
    setEditedInfo(prevInfo => ({
      ...prevInfo,
      skills: selectedList
    }));
  };
  const handleAddSkill = (skill) => {
    setOptione([...optione, skill]);
    setEditedInfo(prevInfo => ({
      ...prevInfo,
      skills: [...prevInfo.skills, skill]
    }));
  };
  
  
  return (
    <Container className="personal-student-page">
      <Row>
      <Col md={12}>
          <div className="info-section">
            {!editMode && (
              <>
                <Col md={12} className='img-edit'>
                  <div className="image col-6">
                    {editedInfo.profileImage && (
                      <img
                      src={editedInfo.profileImage}
                      alt="Profile"
                      className="profile-image-preview"
                      />
                    )}
                    {editedInfo.cv && (
                    <Button variant="link" onClick={downloadCV}>
                      Download CV
                    </Button>
                  )}
                  </div>
                  <div className='btn-edit col-6'>
                    <Button
                    onClick={handleEditClick}
                    className="edit-profile-button"
                    >
                      Edit Profile
                    </Button>
                    </div>
                </Col>
                <Col md={12} className='name-cv'>
                <div className="name col-6">
                  <h2>{editedInfo.name}</h2>
                </div>
              </Col>
              {editedInfo.bio && (
              <Col md={12}>
                <div className="bio">
                  <p>{editedInfo.bio}</p>
                </div>
              </Col>
              )}
              {editedInfo.preferredField && (
              <Col md={12}>
              <div className="preferred-fields col-12">
                <h6>Preferred Failed: {editedInfo.preferredField}</h6>
              </div>
              </Col>
              )}
              <Col md={12}>
              {editedInfo.graduate ? (
                <div className="graduation">
                  <p>{`Graduated from ${editedInfo.university} in ${editedInfo.graduationYear}`}</p>
                </div>
              ):(<div className='graduation'><p>Not graduated yet</p></div>)}
              </Col>
              <Col md={12}>
                <div className="location-phone">
                  <div className="location col-6">
                    <p><b>Location: </b>{editedInfo.city}</p>
                  </div>
                  <div className="phone col-6">
                    <p><b>Phone Number: </b>{editedInfo.phoneNumber}</p>
                  </div>
                </div>
              </Col>
              <Col md={12}>
                <div className="email-gender">
                  <div className="email col-6">
                    <p><b>Email: </b>{email}</p>
                  </div>
                    <div className="gender col-6">
                      <p><b>Gender: </b>{editedInfo.gender}</p>
                    </div>
                </div>
              </Col>
              {((editedInfo.linkedin) || (editedInfo.github)) &&(
                <Col md={12}>
                  <div className='linkedin-github'>
                {editedInfo.linkedin && (
                  <div className="linkedin col-6">
                    <p><b>Linkedin: </b><a href={editedInfo.linkedin} target="_blank" rel="noopener noreferrer">{editedInfo.linkedin}</a></p>
                  </div>
                )}
                {editedInfo.github && (
                  <div className="github col-6">
                    <p><b>Github: </b><a href={editedInfo.github} target="_blank" rel="noopener noreferrer">{editedInfo.github}</a></p>
                  </div>
                )}
                </div>
                </Col>
              )}
              {editedInfo.skills.length > 0 && (
                <Col md={12}>
                  <div className="skills">
                    <p><b>Skills: </b></p>
                    <ul>
                      {editedInfo.skills.map((skill, index) => (
                        <li key={index}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                </Col>
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

              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="graduate"
                    checked={Boolean(editedInfo.graduate)}
                    onChange={(e) => handleInputChange({ target: { name: "graduate", value: e.target.checked } })}
                  />
                  Graduated
                </label>
              </div>

              {editedInfo.graduate && (
                <>
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
                </>
              )}

              <Form.Group controlId="formGithub">
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

              <Form.Group controlId="formSkills">
              <Form.Label>Skills</Form.Label>
              <MultiSelect
                isObject={false}
                onSelect={handleSkillsChange}
                onRemove={handleSkillsChange}
                onSearch={(value) => {
                  if (value && !optione.includes(value)) {
                    handleAddSkill(value);
                  }
                }}
                isCreatable={true}
                options={optione}
                selectedValues={editedInfo.skills}
              />
            </Form.Group>
              <Form.Group controlId="formCV">
                <Form.Label>CV</Form.Label>
                <Form.Control
                  type="file"
                  accept=".pdf"
                  onChange={handleCVUpload}
                />
              </Form.Group>

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
