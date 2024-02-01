import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Spinner from '../../../assets/spinner/Spinner';
import './Plans.scss';
import { useUserType } from '../../../helpers/UserTypeContext';
import { useTranslation } from 'react-i18next';

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userType } = useUserType();
  const { t } = useTranslation();

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
                  <Button variant="primary">{t('plans.addNewPlan')}</Button>
                </Link>
              )}
            </div>
          )}

          {userType === 'student' && !isLoading && (
            <div className='note'>
              <h5>{t('plans.traineeNote.header')}</h5>
              <h5>{t('plans.traineeNote.body1')}</h5>
              <h5>{t('plans.traineeNote.body2')}</h5>
              <h5>{t('plans.traineeNote.body3')}</h5>
              <h5>{t('plans.traineeNote.footer')}</h5>
            </div>
          )}

          {!isLoading && (
            <div className="plans-list">
              {plans.map((plan) => (
                <div key={plan._id} className="plan-item">
                  <h3>{plan.field}</h3>
                  <Link to={`/home/plans/${plan._id}`}>{t('plans.viewPlan')}</Link>
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
