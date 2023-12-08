import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useEmail } from '../../../helpers/EmailContext';
import './PersonalCompany.scss';
import cities from '../../../helpers/cities';
import axios from 'axios';

const PersonalCompany = () => {
  const {
    email,
    username,
    city,
    phoneNumber,
    description,
    linkedin,
    profileImage,
    setLoggedInEmail,
  } = useEmail();

  const [editMode, setEditMode] = useState(false);
  const [editedInfo, setEditedInfo] = useState({
    companyName: username,
    city,
    phoneNumber,
    description,
    linkedin,
    profileImage,
  });

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelClick = () => {
    setEditMode(false);
    setEditedInfo({
      companyName: username,
      city,
      phoneNumber,
      description,
      linkedin,
      profileImage,
    });
  };

  const handleSaveClick = async () => {
    try {
      const response = await axios.post('http://localhost:3001/updateCompanyInfo', {
        email: email,
        ...editedInfo,
      });

      if (response.data.success) {
        setEditMode(false);
        setLoggedInEmail(
          email,
          editedInfo.companyName,
          editedInfo.city,
          editedInfo.phoneNumber,
          editedInfo.description,
          editedInfo.linkedin,
          editedInfo.profileImage
        );
      } else {
        console.error('Failed to update company info');
      }
    } catch (error) {
      console.error('Error updating company info', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
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

  useEffect(() => {
    setEditedInfo({
      companyName: username,
      city,
      phoneNumber,
      description,
      linkedin,
      profileImage,
    });
  }, [email, username, city, phoneNumber, description, linkedin, profileImage]);

  return (
    <Container className="personal-company-page">
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
                <h2>{editedInfo.companyName}</h2>
                <p>Email: {email}</p>
                <p>Location: {editedInfo.city}</p>
                <p>Phone Number: {editedInfo.phoneNumber}</p>
                {editedInfo.linkedin && (
                  <div className="sub-info">
                    <p>linkedin: </p>
                    <a
                      href={editedInfo.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {editedInfo.linkedin}
                    </a>
                  </div>
                )}
                {editedInfo.description && (
                  <>
                    <hr />
                    <p>{editedInfo.description}</p>
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
              <Form.Group controlId="formCompanyName">
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter company name"
                  name="companyName"
                  value={editedInfo.companyName}
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
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter description"
                  name="description"
                  value={editedInfo.description}
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

export default PersonalCompany;