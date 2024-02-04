import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import "./PersonalStudent.scss";
import cities from '../../../helpers/cities';
import fields from "../../../helpers/fields";
import Spinner from '../../../assets/spinner/Spinner';
import { useTranslation } from 'react-i18next';

const PersonalStudent = () => {
  const _id = localStorage.getItem('id');
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [newSkill, setNewSkill] = useState('');
  const [error, setError] = useState("");
  const [editedInfo, setEditedInfo] = useState({
    name: '',
    city: '',
    phoneNumber: '',
    bio: '',
    linkedin: '',
    profileImage: '',
    github: '',
    gender: '',
    graduate: false,
    university: '',
    graduationYear: '',
    preferredField: '',
    skills: [],
    cv: '',
  });
  const { t } = useTranslation();

  useEffect(() => {
    fetchStudentData();
  }, [_id]);

  const fetchStudentData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:3001/student/${_id}`);
      if (response.data.success) {
        const studentData = response.data.student;
        setEditedInfo({
          name: studentData.name,
          email: studentData.email,
          city: studentData.city,
          phoneNumber: studentData.phoneNumber,
          bio: studentData.bio,
          linkedin: studentData.linkedin,
          profileImage: studentData.profileImage,
          github: studentData.github,
          gender: studentData.gender,
          graduate: studentData.graduate,
          university: studentData.university,
          graduationYear: studentData.graduationYear,
          preferredField: studentData.preferredField,
          skills: studentData.skills,
          cv: studentData.cv,
        });
      }
    } catch (error) {
      console.error('Error fetching student data', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = () => {
    setEditMode(true);
    setError("");
  };

  const handleCancelClick = () => {
    fetchStudentData();
    setEditMode(false);
  };

  const handleSaveClick = async () => {
    if (!editedInfo.name.trim() || !editedInfo.city.trim() || !editedInfo.phoneNumber.trim()
    || !editedInfo.university.trim() || editedInfo.graduationYear === '0' || editedInfo.graduationYear === '' || !editedInfo.gender.trim()
  ) {
      setError("There are required fields");
      return;
    }
    try {
      const response = await axios.put(`http://localhost:3001/updateStudent/${_id}`, {
        ...editedInfo,
      });

      if (response.data.success) {
        setEditMode(false);
        fetchStudentData();
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
        setEditedInfo(prevInfo => ({
          ...prevInfo,
          profileImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedInfo(prevInfo => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleCVUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedInfo(prevInfo => ({
          ...prevInfo,
          cv: reader.result,
        }));
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

  const handleAddNewSkill = () => {
    if (newSkill && !editedInfo.skills.includes(newSkill)) {
      setEditedInfo(prevInfo => ({
        ...prevInfo,
        skills: [...prevInfo.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setEditedInfo(prevInfo => ({
      ...prevInfo,
      skills: prevInfo.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  if (isLoading) {
    return <Spinner />;
  }

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
                        alt={t('personalStudent.profile')}
                        className="profile-image-preview"
                      />
                    )}
                  </div>
                  <Button
                    onClick={handleEditClick}
                    className="edit-profile-button col-6"
                  >
                    {t('personalStudent.editProfile')}
                  </Button>
                </Col>
                <Col md={12} className='name-cv'>
                  <div className="name col-6">
                    <h2>{editedInfo.name}</h2>
                  </div>
                  {editedInfo.cv && (
                    <Button variant="link" onClick={downloadCV}>
                      {t('personalStudent.downloadCV')}
                    </Button>
                  )}
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
                      <h6>{t('personalStudent.preferredField')}: {editedInfo.preferredField}</h6>
                    </div>
                  </Col>
                )}
                <Col md={12}>
                  {editedInfo.graduate ? (
                    <div className="graduation">
                      <p>{`${t('personalStudent.graduatedFrom')} ${editedInfo.university} ${t('personalStudent.in')} ${editedInfo.graduationYear}`}</p>
                    </div>
                  ) : (<div className='graduation'><p>{t('personalStudent.notGraduated')}</p></div>)}
                </Col>
                <Col md={12}>
                  <div className="location-phone">
                    <div className="location col-12 col-sm-6">
                      <p><b>{t('personalStudent.city')}: </b>{editedInfo.city}</p>
                    </div>
                    <div className="phone col-12 col-sm-6">
                      <p><b>{t('personalStudent.phoneNumber')}: </b>{editedInfo.phoneNumber}</p>
                    </div>
                  </div>
                </Col>
                <Col md={12}>
                  <div className="email-gender">
                    <div className="email col-12 col-sm-6">
                      <p><b>{t('personalStudent.email')}: </b>{editedInfo.email}</p>
                    </div>
                    <div className="gender col-12 col-sm-6">
                      <p><b>{t('personalStudent.gender')}: </b>{editedInfo.gender}</p>
                    </div>
                  </div>
                </Col>
                {((editedInfo.linkedin) || (editedInfo.github)) && (
                  <Col md={12}>
                    <div className='linkedin-github'>
                      {editedInfo.linkedin && (
                        <div className="linkedin col-12 col-sm-6">
                          <p><b>{t('personalStudent.linkedin')}: </b><a href={editedInfo.linkedin} target="_blank"
                            rel="noopener noreferrer">{editedInfo.linkedin}</a></p>
                        </div>
                      )}
                      {editedInfo.github && (
                        <div className="github col-12 col-sm-6">
                          <p><b>{t('personalStudent.github')}: </b><a href={editedInfo.github} target="_blank"
                            rel="noopener noreferrer">{editedInfo.github}</a></p>
                        </div>
                      )}
                    </div>
                  </Col>
                )}
                {editedInfo.skills.length > 0 && (
                  <Col md={12}>
                    <div className="skills">
                      <p><b>{t('personalStudent.skills')}: </b></p>
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
              <Form.Group controlId="formProfileImage" className='form-div'>
                <Form.Label className='l'>{t('personalStudent.profileImage')}</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {editedInfo.profileImage && (
                  <img
                    src={editedInfo.profileImage}
                    alt={t('personalStudent.profilePreview')}
                    className="profile-image-preview"
                  />
                )}
              </Form.Group>

              <Form.Group controlId="formName" className='form-div'>
                <Form.Label className='l'>{t('personalStudent.name')} <span className="required">*</span></Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t('personalStudent.enterName')}
                  name="name"
                  value={editedInfo.name}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formCity" className='form-div'>
                <Form.Label className='l'>{t('personalStudent.city')} <span className="required">*</span></Form.Label>
                <Form.Control
                  className='dr'
                  as="select"
                  name="city"
                  value={editedInfo.city}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">{t('personalStudent.selectCity')}</option>
                  {cities.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formPhoneNumber" className='form-div'>
                <Form.Label className='l'>{t('personalStudent.phoneNumber')} <span className="required">*</span></Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t('personalStudent.enterPhoneNumber')}
                  name="phoneNumber"
                  value={editedInfo.phoneNumber}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formBio" className='form-div'>
                <Form.Label className='l'>{t('personalStudent.bio')}</Form.Label>
                <Form.Control
                  className='dr'
                  as="textarea"
                  placeholder={t('personalStudent.enterBio')}
                  name="bio"
                  value={editedInfo.bio}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formLinkedin" className='form-div'>
                <Form.Label className='l'>{t('personalStudent.linkedin')}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t('personalStudent.enterLinkedin')}
                  name="linkedin"
                  value={editedInfo.linkedin || ''}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <div className="form-group checkbox-group form-div">
                <label>
                  <input
                    type="checkbox"
                    name="graduate"
                    checked={Boolean(editedInfo.graduate)}
                    onChange={(e) => handleInputChange({ target: { name: "graduate", value: e.target.checked } })}
                  />
                  {t('personalStudent.graduate')}
                </label>
              </div>

              {editedInfo.graduate && (
                <>
                  <Form.Group controlId="formUniversity" className='form-div'>
                    <Form.Label className='l'>{t('personalStudent.university')} <span className="required">*</span></Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={t('personalStudent.enterUniversity')}
                      name="university"
                      value={editedInfo.university || ''}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formGraduationYear" className='form-div'>
                    <Form.Label className='l'>{t('personalStudent.graduationYear')} <span className="required">*</span></Form.Label>
                    <Form.Control
                      type="number"
                      placeholder={t('personalStudent.enterGraduationYear')}
                      name="graduationYear"
                      value={editedInfo.graduationYear || ''}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </>
              )}

              <Form.Group controlId="formGithub" className='form-div'>
                <Form.Label className='l'>{t('personalStudent.github')}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t('personalStudent.enterGithub')}
                  name="github"
                  value={editedInfo.github || ''}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formGender" className='form-div'>
                <Form.Label className='l'>{t('personalStudent.gender')} <span className="required">*</span></Form.Label>
                <Form.Control
                  className='dr'
                  as="select"
                  name="gender"
                  value={editedInfo.gender || ''}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">{t('personalStudent.selectGender')}</option>
                  <option value="male">{t('personalStudent.male')}</option>
                  <option value="female">{t('personalStudent.female')}</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formPreferredField" className='ffield form-div'>
                <Form.Label className='l'>{t('personalStudent.preferredField')}</Form.Label>
                <Form.Control
                  className='dr'
                  as="select"
                  name="preferredField"
                  value={editedInfo.preferredField}
                  onChange={handleInputChange}
                >
                  <option value="">{t('personalStudent.selectPreferredField')}</option>
                  {fields.map((preferredField, index) => (
                    <option key={index} value={preferredField}>
                      {preferredField}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formSkills" className='form-div'>
                  <Form.Label className='l'>{t('personalStudent.skills')}</Form.Label>
                  <Row style={{ marginRight: '10px' }} >
                    <Col md={11}>
                      <Form.Control
                        type="text"
                        placeholder={t('personalStudent.addSkill')}
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                      />
                    </Col>
                    <Col md={1}>
                      <Button variant="primary" onClick={handleAddNewSkill}>
                        {t('personalStudent.add')}
                      </Button>
                    </Col>
                  </Row>
                  {editedInfo.skills.length > 0 && (
                    <ul>
                      {editedInfo.skills.map((skill, index) => (
                        <li key={index}  style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #CCC' }}>
                          {skill}
                          <Button variant="danger" onClick={() => handleRemoveSkill(skill)} style={{ margin: '5px 10px 0 0' }}>
                            {t('personalStudent.remove')}
                          </Button>
                        </li>
                      ))}
                    </ul>
                  )}
                </Form.Group>
            <Form.Group controlId="formCV" className='form-div'>
                <Form.Label className='l'>{t('personalStudent.cv')}</Form.Label>
                <Form.Control
                  type="file"
                  accept=".pdf"
                  onChange={handleCVUpload}
                />
              </Form.Group>
              <div className='btns'>
              <Button variant="primary" onClick={handleSaveClick}>
                {t('personalStudent.save')}
              </Button>
              <Button variant="secondary" onClick={handleCancelClick}>
                {t('personalStudent.cancel')}
              </Button>
              </div>
              {error && <p style={{textAlign: "center", color: "red"}}>{error}</p>}
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default PersonalStudent;