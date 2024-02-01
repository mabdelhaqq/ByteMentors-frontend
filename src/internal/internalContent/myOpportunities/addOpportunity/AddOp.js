import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddOp.scss';
import fields from "../../../../helpers/fields";
import { useTranslation } from 'react-i18next';

const AddOp = () => {
  const navigate = useNavigate();
  const _id = localStorage.getItem('id'); 
  const [field, setField] = useState('');
  const [deadline, setDeadline] = useState('');
  const [description, setDescription] = useState('');
  const [validationError, setValidationError] = useState('');
  const { t } = useTranslation();

  const handleFieldChange = (e) => {
    setField(e.target.value);
    setValidationError('');
  };

  const handleDeadlineChange = (e) => {
    setDeadline(e.target.value);
    setValidationError('');
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    setValidationError('');
  };

  const handleCancelClick = () => {
    navigate('/home/myopp');
  };

  const handlePublishClick = async () => {
    if (!field || !deadline || !description) {
      setValidationError(t('addOpportunity.allFieldsRequired'));
      return;
    }
    setValidationError('');
    try {
      const response = await axios.post('http://localhost:3001/addOpportunity', {
        companyId: _id,
        field,
        deadline,
        description,
      });

      if (response.data.success) {
        navigate('/home/myopp');
      } else {
        setValidationError(t('addOpportunity.failedToAddOpportunity'));
      }
    } catch (error) {
      setValidationError(t('addOpportunity.errorAddingOpportunity'));
    }
  };

  return (
    <Container className="add-opportunity-page">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form>
            <Form.Group controlId="formField">
              <Form.Control className='dr' as="select" onChange={handleFieldChange} value={field} required>
                <option value="">{t('addOpportunity.selectField')}</option>
                {fields.map((fieldOption, index) => (
                  <option key={index} value={fieldOption}>{fieldOption}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formDeadline">
              <Form.Control type="date" onChange={handleDeadlineChange} value={deadline} required />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Control className='dr' as="textarea" placeholder={t('addOpportunity.writeDescription')} rows={4} onChange={handleDescriptionChange} value={description} required />
            </Form.Group>
            <div className='btns'>
              <Button variant="success" onClick={handlePublishClick}>{t('addOpportunity.publishButton')}</Button>
              <Button variant="danger" onClick={handleCancelClick}>{t('addOpportunity.cancelButton')}</Button>
            </div>
            {validationError && <p className='error-message'>{validationError}</p>}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddOp;
