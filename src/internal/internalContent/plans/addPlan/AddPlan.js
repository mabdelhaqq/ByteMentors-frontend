import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddPlan.scss';
import { useTranslation } from 'react-i18next';

const AddPlan = () => {
  const navigate = useNavigate();
  const [field, setField] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const { t } = useTranslation();

  const _id = localStorage.getItem('id');

  const handleFieldChange = (e) => {
    setField(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleCancelClick = () => {
    navigate('/home/allplans');
  };

  const handlePublishClick = async () => {
    if (!field || !description) {
      setError('addPlan.requiredError');
      return;
    }
  
    setError('');
    try {
      const response = await axios.post('http://localhost:3001/addPlan', {
        adminId : _id,
        field,
        description,
      });
  
      if (response.data.success) {
        navigate('/home/allplans');
      } else {
        setError('addPlan.addError');
      }
    } catch (error) {
      setError('addPlan.generalError');
    }
  };
  
  return (
    <Container className="add-plan-page">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form>
            <Form.Group controlId="formField">
              <Form.Control type="text" placeholder={t('addPlan.fieldPlaceholder')} onChange={handleFieldChange} value={field} required />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Control className='dr' as="textarea" placeholder={t('addPlan.descriptionPlaceholder')} rows={4} onChange={handleDescriptionChange} value={description} required />
            </Form.Group>
            <div className='btns'>
              <Button variant="success" onClick={handlePublishClick}>{t('addPlan.publishButton')}</Button>
              <Button variant="danger" onClick={handleCancelClick}>{t('addPlan.cancelButton')}</Button>
            </div>
            {error && <p className='error-message'>{t(error)}</p>}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddPlan
