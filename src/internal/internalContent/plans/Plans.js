import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Spinner from '../../../assets/spinner/Spinner';
import './Plans.scss';
import { useUserType } from '../../../helpers/UserTypeContext';

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userType } = useUserType();

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await axios.get('http://localhost:3001/plans');
      setPlans(response.data);
    } catch (error) {
      console.error('Error fetching plans', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="plans-page">
      <Row>
        <Col md={12}>
          {isLoading ? (
            <Spinner />
          ) : (
            <div className="add-button-container">
              {userType === 'admin' && (
                <Link to="/home/addplan">
                  <Button variant="primary">Add new plan</Button>
                </Link>
              )}
            </div>
          )}

          {userType === 'student' && !isLoading && (
            <div className='note'>
              <h5>Dear Trainee,</h5>
              <h5>On this page, you can find various training plans in the fields of technology and computer science. These plans have been carefully curated by experts in the field to assist individuals like yourself in enhancing their skills. You can benefit from these plans and train yourself by following the outlined steps. They are designed to help you strengthen your expertise in specific areas.</h5>
              <h5>Please note that these training plans may evolve in the future, and alternative options may become available. Stay dedicated to your learning journey, and you'll undoubtedly see progress.</h5>
              <h5>Best regards,</h5>
            </div>
          )}

          {!isLoading && (
            <div className="plans-list">
              {plans.map((plan) => (
                <div key={plan._id} className="plan-item">
                  <h3>{plan.field}</h3>
                  <Link to={`/home/plans/${plan._id}`}>View This plan</Link>
                </div>
              ))}
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Plans;
