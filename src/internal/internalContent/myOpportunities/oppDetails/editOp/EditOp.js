import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../../../../../assets/spinner/Spinner';
import './EditOp.scss'
import { useEmail } from '../../../../../helpers/EmailContext';

const EditOp = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { _id } = useEmail();
  const [field, setField] = useState('');
  const [deadline, setDeadline] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [validationError, setValidationError] = useState('');

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
        console.error('Failed to fetch opportunity details');
      }
    } catch (error) {
      console.error('Error fetching opportunity details', error);
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
      setValidationError('All required fields must be filled out');
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
        console.error(response.data.error || 'Failed to edit opportunity');
      }
    } catch (error) {
      setValidationError(error.response.data.error || 'Error editing opportunity');
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
              <Form.Control as="select" onChange={handleFieldChange} value={field} required>
                <option value="">Select Field</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formDeadline">
              <Form.Control type="date" onChange={handleDeadlineChange} value={deadline} required />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Control as="textarea" placeholder='Write a description about this opportunity' rows={4} onChange={handleDescriptionChange} value={description} required />
            </Form.Group>
            <div className='btns'>
              <Button variant="success" onClick={handlePublishClick} disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save'}
              </Button>
              <Button variant="danger" onClick={handleCancelClick}>Cancel</Button>
            </div>
            {validationError && <p className='error-message'>{validationError}</p>}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditOp;
