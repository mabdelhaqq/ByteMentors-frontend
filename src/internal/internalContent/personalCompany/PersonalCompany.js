import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import './PersonalCompany.scss';
import cities from '../../../helpers/cities';
import Spinner from '../../../assets/spinner/Spinner';

const PersonalCompany = () => {
  const { t } = useTranslation();
  const _id = localStorage.getItem('id');
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editedInfo, setEditedInfo] = useState({
    companyName: '',
    email: '',
    city: '',
    phoneNumber: '',
    description: '',
    linkedin: '',
    website: '',
    profileImage: '',
  });

  useEffect(() => {
    fetchCompanyData();
  }, [_id]);

  const fetchCompanyData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:3001/company/${_id}`);
      if (response.data.success) {
        const companyData = response.data.company;
        setEditedInfo({
          companyName: companyData.username,
          email: companyData.email,
          city: companyData.city,
          phoneNumber: companyData.phoneNumber,
          description: companyData.description,
          linkedin: companyData.linkedin,
          website: companyData.website,
          profileImage: companyData.profileImage,
        });
      }
    } catch (error) {
      console.error('Error fetching company data', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelClick = () => {
    setEditMode(false);
  };
  
  const handleSaveClick = async () => {
    try {
      const response = await axios.put(`http://localhost:3001/updateCompany/${_id}`, {
        ...editedInfo,
      });

      if (response.data.success) {
        setEditMode(false);
        fetchCompanyData();
      } else {
        console.error('Failed to update company info');
      }
    } catch (error) {
      console.error('Error updating company info', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedInfo(prevInfo => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedInfo(prevInfo => ({
          ...prevInfo,
          profileImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Container className="personal-company-page">
      <Row>
        <Col md={12}>
          <div className="info-section">
            {!editMode ? (
              <>
                <Col md={12} className='img-edit'>
                  <div className="image col-6">
                    {editedInfo.profileImage && (
                      <img
                        src={editedInfo.profileImage}
                        alt={t('personalCompany.companyName')}
                        className="profile-image-preview"
                      />
                    )}
                  </div>
                  <Button
                    onClick={handleEditClick}
                    className="edit-profile-button col-6"
                  >
                    {t('personalCompany.editProfile')}
                  </Button>
                </Col>
                <Col md={12}>
                  <div className="name">
                    <h2>{editedInfo.companyName}</h2>
                  </div>
                </Col>
                <Col md={12}>
                  <div className="location-phone">
                    <div className='location col-12 col-sm-6'>
                      <p><b>{t('personalCompany.location')}: </b>{editedInfo.city}</p>
                    </div>
                    <div className='phone col-12 col-sm-6'>
                      <p><b>{t('personalCompany.phoneNumber')}: </b>{editedInfo.phoneNumber}</p>
                    </div>
                  </div>
                </Col>
                <Col md={12}>
                  <div className="email-linkedin">
                    <div className='email col-12 col-sm-6'>
                      <p><b>{t('personalCompany.email')}: </b>{editedInfo.email}</p>
                    </div>
                    {editedInfo.linkedin && (
                      <div className='linkedin col-12 col-sm-6'>
                        <p><b>{t('personalCompany.linkedin')}: </b>
                          <a href={editedInfo.linkedin} target="_blank" rel="noopener noreferrer">
                            {editedInfo.linkedin}
                          </a>
                        </p>
                      </div>
                    )}
                    {editedInfo.website && (
                      <div className='website col-12 col-sm-6'>
                        <p><b>{t('personalCompany.website')}: </b>
                          <a href={editedInfo.website} target="_blank" rel="noopener noreferrer">
                            {editedInfo.website}
                          </a>
                        </p>
                      </div>
                    )}
                  </div>
                </Col>
                {editedInfo.description && (
                  <Col md={12}>
                    <div className="description">
                      <p>{editedInfo.description}</p>
                    </div>
                  </Col>
                )}
              </>
            ) : (
              <Form>
                <Form.Group className='form-group' controlId="formProfileImage">
                  <Form.Label>{t('personalCompany.profileImage')}</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {editedInfo.profileImage && (
                    <img
                      src={editedInfo.profileImage}
                      alt={t('personalCompany.profileImagePreview')}
                      className="profile-image-preview"
                    />
                  )}
                </Form.Group>

                <Form.Group className='form-group' controlId="formCompanyName">
                  <Form.Label>{t('personalCompany.companyName')}</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={t('personalCompany.enterCompanyName')}
                    name="companyName"
                    value={editedInfo.companyName}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="formCity" className='form-group'>
                  <Form.Label>{t('personalCompany.location')}</Form.Label>
                  <Form.Control
                    className='dr'
                    as="select"
                    name="city"
                    value={editedInfo.city}
                    onChange={handleInputChange}
                  >
                    <option value="">{t('personalCompany.selectCity')}</option>
                    {cities.map((city, index) => (
                      <option key={index} value={city}>
                        {city}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="formPhoneNumber" className='form-group'>
                  <Form.Label>{t('personalCompany.phoneNumber')}</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={t('personalCompany.enterPhoneNumber')}
                    name="phoneNumber"
                    value={editedInfo.phoneNumber}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="formDescription" className='form-group'>
                  <Form.Label>{t('personalCompany.description')}</Form.Label>
                  <Form.Control
                    className='dr'
                    as="textarea"
                    placeholder={t('personalCompany.enterDescription')}
                    name="description"
                    value={editedInfo.description}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="formLinkedin" className='form-group'>
                  <Form.Label>{t('personalCompany.linkedin')}</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={t('personalCompany.enterLinkedinURL')}
                    name="linkedin"
                    value={editedInfo.linkedin || ''}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="formWebsite" className='form-group'>
                  <Form.Label>{t('personalCompany.website')}</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={t('personalCompany.enterCompanyWebsite')}
                    name="website"
                    value={editedInfo.website}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <div className='btn-group'>
                  <Button variant="primary" className='btn' onClick={handleSaveClick}>
                    {t('personalCompany.save')}
                  </Button>
                  <Button variant="secondary" className='btn' onClick={handleCancelClick}>
                    {t('personalCompany.cancel')}
                  </Button>
                </div>
              </Form>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PersonalCompany;