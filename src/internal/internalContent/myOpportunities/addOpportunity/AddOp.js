import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEmail } from '../../../../helpers/EmailContext';
import './AddOp.scss';
import fields from "../../../../helpers/fields";

const AddOp = () => {
  const navigate = useNavigate();
  const { _id } = useEmail();
  const [field, setField] = useState('');
  const [deadline, setDeadline] = useState('');
  const [description, setDescription] = useState('');
  const [validationError, setValidationError] = useState('');

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
      setValidationError('All required fields must be filled out');
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
        console.error(response.data.error || 'Failed to add opportunity');
      }
    } catch (error) {
      setValidationError(error.response.data.error || 'Error adding opportunity');
    }
  };

  return (
    <Container className="add-opportunity-page">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form>
            <Form.Group controlId="formField">
            <Form.Control as="select" onChange={handleFieldChange} value={field} required>
                <option value="">Select Field</option>
                {fields.map((fieldOption, index) => (
                  <option key={index} value={fieldOption}>{fieldOption}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formDeadline">
              <Form.Control type="date" onChange={handleDeadlineChange} value={deadline} required />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Control as="textarea" placeholder='Write a description about this opportunity' rows={4} onChange={handleDescriptionChange} value={description} required />
            </Form.Group>
            <div className='btns'>
              <Button variant="success" onClick={handlePublishClick}>Publish</Button>
              <Button variant="danger" onClick={handleCancelClick}>Cancel</Button>
            </div>
            {validationError && <p className='error-message'>{validationError}</p>}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddOp;
