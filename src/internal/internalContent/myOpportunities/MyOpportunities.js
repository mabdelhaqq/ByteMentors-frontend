import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 
import Spinner from '../../../assets/spinner/Spinner';
import './MyOpportunities.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

const MyOpportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const fetchOpportunities = async () => {
    try {
      const companyId = localStorage.getItem('id').toString();
      const response = await axios.get(`http://localhost:3001/opportunitiesc?companyId=${companyId}`);
      setOpportunities(response.data);
    } catch (error) {
      console.error('Error fetching opportunities', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDeadline = (deadline) => {
    const date = new Date(deadline);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleTitleClick = (opportunityId) => {
    navigate(`/home/myopp/${opportunityId}`);
  };

  return (
    <Container className="my-opportunities-page">
      <Row>
        <Col md={12}>
          <div className="add-button-container">
            <Link to="/home/myopp/addop">
              <Button variant="primary">{t('myOpportunities.addNewOpportunity')}</Button>
            </Link>
          </div>
          {isLoading ? (
            <Spinner />
          ) : opportunities.length > 0 ? (
            <div className="opportunities-list">
              {opportunities
                .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
                .map((opportunity) => (
                  <div
                    key={opportunity._id}
                    className={`opportunity-item ${
                      new Date(opportunity.deadline) < new Date() ? 'deadline-passed' : ''
                    }`}
                    onClick={() => handleTitleClick(opportunity._id)}
                  >
                    <div className='info'>
                      <h3>{opportunity.field}</h3>
                      <p>
                        <span className='dead'>{t('myOpportunities.deadline')}: </span>
                        {formatDeadline(opportunity.deadline)}
                      </p>
                    </div>
                    {new Date(opportunity.deadline) < new Date() && (
                      <div className='ex'>
                        <FontAwesomeIcon icon={faExclamation} className="deadline-icon" />
                        <h2 className='h-ex'>{t('myOpportunities.expired')}</h2>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          ) : (
            <p className='no'>{t('myOpportunities.noOpportunities')}</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default MyOpportunities;