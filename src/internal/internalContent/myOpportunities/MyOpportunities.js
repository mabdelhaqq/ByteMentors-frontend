import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 
import Spinner from '../../../assets/spinner/Spinner';
import './MyOpportunities.scss';
import { useEmail } from '../../../helpers/EmailContext';

const MyOpportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { _id } = useEmail();
  const navigate = useNavigate(); 

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const fetchOpportunities = async () => {
    setIsLoading(true);
    try {
      const companyId = _id.toString();
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
              <Button variant="primary">Add new opportunity</Button>
            </Link>
            {isLoading && <Spinner />}
          </div>
          <div className="opportunities-list">
            {opportunities.length > 0 ? (
              opportunities.map((opportunity) => (
                <div key={opportunity._id} className="opportunity-item" onClick={() => handleTitleClick(opportunity._id)}>
                  <h3>{opportunity.field}</h3>
                  <p><span className='dead'>Deadline: </span>{formatDeadline(opportunity.deadline)}</p>
                </div>
              ))
            ) : (
              <p className='no'>No opportunities available. Add opportunities now.</p>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MyOpportunities;