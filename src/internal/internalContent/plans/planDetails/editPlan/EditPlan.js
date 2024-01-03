import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../../../../../assets/spinner/Spinner';
import './EditPlan.scss';

const EditPlan = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [field, setField] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlanDetails = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:3001/plans/${id}`);
        if (response.data.success) {
          const planData = response.data.plan;
          setField(planData.field);
          setDescription(planData.description);
        } else {
          console.error('Failed to fetch plan details');
        }
      } catch (error) {
        console.error('Error fetching plan details', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlanDetails();
  }, [id]);

  const handleFieldChange = (e) => {
    setField(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleCancelClick = () => {
    navigate('/home/allplans');
  };

  const handleSaveClick = async () => {
    if (!field.trim() || !description.trim()) {
      setError('All required fields must be filled out');
      return;
    }

    setError('');
    try {
      const response = await axios.put(`http://localhost:3001/editPlan/${id}`, {
        field: field.trim(),
        description: description.trim(),
      });

      if (response.data.success) {
        navigate('/home/allplans');
      } else {
        setError(response.data.error || 'Failed to edit plan');
      }
    } catch (error) {
      setError(error.response.data.error || 'Error editing plan');
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Container className="edit-plan-page">
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
              <Button variant="success" onClick={handleSaveClick}>Save</Button>
              <Button variant="danger" onClick={handleCancelClick}>Cancel</Button>
            </div>
            {error && <p className='error-message'>{error}</p>}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditPlan;