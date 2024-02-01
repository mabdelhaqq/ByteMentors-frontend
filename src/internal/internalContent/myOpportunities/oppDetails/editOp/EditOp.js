import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../../../../../assets/spinner/Spinner';
import './EditOp.scss';
import fields from "../../../../../helpers/fields";
import { useTranslation } from 'react-i18next';

const EditOp = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const _id = localStorage.getItem('id');
  const [field, setField] = useState('');
  const [deadline, setDeadline] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [validationError, setValidationError] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    fetchOpportunityDetails();
  }, [id]);

  const fetchOpportunityDetails = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:3001/opportunity/${id}`);
      if (response.data.success) {
        const opportunityData = response.data.opportunity;
        setField(opportunityData.field);
        const formattedDeadline = new Date(opportunityData.deadline).toISOString().substring(0, 10);
        setDeadline(formattedDeadline);
        setDescription(opportunityData.description);
      } else {
        console.error(t('editOpportunity.failedToFetchDetails'));
      }
    } catch (error) {
      console.error(t('editOpportunity.errorFetchingDetails'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleFieldChange = (e) => {
    setField(e.target.value);
  };

  const handleDeadlineChange = (e) => {
    setDeadline(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleCancelClick = () => {
    navigate('/home/myopp');
  };

  const handlePublishClick = async () => {
    setIsSaving(true);
    if (!field || !deadline || !description) {
      setValidationError(t('editOpportunity.allFieldsRequired'));
      setIsSaving(false);
      return;
    }
    setValidationError('');
    try {
      const response = await axios.put(`http://localhost:3001/editOpportunity/${id}`, {
        companyId: _id,
        field,
        deadline,
        description,
      });

      if (response.data.success) {
        navigate('/home/myopp');
      } else {
        console.error(t('editOpportunity.failedToEdit'));
      }
    } catch (error) {
      setValidationError(t('editOpportunity.errorEditing'));
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Container className="edit-opportunity-page">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form>
            <Form.Group controlId="formField">
              <Form.Control className='dr' as="select" onChange={handleFieldChange} value={field} required>
                <option value="">{t('editOpportunity.selectField')}</option>
                {fields.map((fieldOption, index) => (
                  <option key={index} value={fieldOption}>{fieldOption}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formDeadline">
              <Form.Control type="date" onChange={handleDeadlineChange} value={deadline} required />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Control className='dr' as="textarea" placeholder={t('editOpportunity.writeDescription')} rows={4} onChange={handleDescriptionChange} value={description} required />
            </Form.Group>
            <div className='btns'>
              <Button variant="success" onClick={handlePublishClick} disabled={isSaving}>
                {isSaving ? t('editOpportunity.saving') : t('editOpportunity.save')}
              </Button>
              <Button variant="danger" onClick={handleCancelClick}>{t('editOpportunity.cancel')}</Button>
            </div>
            {validationError && <p className='error-message'>{t(`editOpportunity.${validationError}`)}</p>}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditOp;