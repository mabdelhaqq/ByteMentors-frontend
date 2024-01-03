import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddPlan.scss';
import { useEmail } from '../../../../helpers/EmailContext';

const AddPlan = () => {
  const navigate = useNavigate();
  const [field, setField] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const { _id } = useEmail();
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
      setError('All required fields must be filled out');
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
        setError(response.data.error || 'Failed to add plan');
      }
    } catch (error) {
      setError(error.response.data.error || 'Error adding plan');
    }
  };
  
  return (
    <Container className="add-plan-page">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form>
            <Form.Group controlId="formField">
              <Form.Control type="text" placeholder="Enter plan field" onChange={handleFieldChange} value={field} required />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Control as="textarea" placeholder="Write a description about this plan" rows={4} onChange={handleDescriptionChange} value={description} required />
            </Form.Group>
            <div className='btns'>
              <Button variant="success" onClick={handlePublishClick}>Publish</Button>
              <Button variant="danger" onClick={handleCancelClick}>Cancel</Button>
            </div>
            {error && <p className='error-message'>{error}</p>}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddPlan;