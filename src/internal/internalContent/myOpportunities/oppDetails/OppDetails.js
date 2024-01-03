import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './OppDetails.scss';
import Spinner from '../../../../assets/spinner/Spinner';
import { useUserType } from '../../../../helpers/UserTypeContext';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { useEmail } from '../../../../helpers/EmailContext';

const OppDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [opportunity, setOpportunity] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const { userType } = useUserType();
  const { _id } = useEmail();

  useEffect(() => {
    fetchOpportunityDetails();
  }, [id]);

  const fetchOpportunityDetails = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:3001/opportunity/${id}`);
      if (response.data.success) {
        setOpportunity(response.data.opportunity);
        setHasApplied(response.data.opportunity.applicants.some(applicant => applicant.studentId === _id));
        const companyResponse = await axios.get(`http://localhost:3001/company/${response.data.opportunity.companyId}`);
        if (companyResponse.data.success) {
          setCompanyName(companyResponse.data.company.companyName);
        }
      } else {
        console.error('Failed to fetch opportunity details');
      }
    } catch (error) {
      console.error('Error fetching opportunity details', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = async () => {
    setIsDeleting(true);
    try {
      const response = await axios.delete(`http://localhost:3001/opportunitye/${id}`);
      if (response.data.success) {
        navigate('/home/myopp');
      } else {
        console.error('Failed to delete opportunity');
      }
    } catch (error) {
      console.error('Error deleting opportunity', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEditClick = () => {
    navigate(`/home/myopp/editop/${id}`);
  };

  const handleSubmitterClick = () => {
    navigate(`/home/myopp/response/${id}`);
  };

  const handleSubmitClick = async () => {
    if (hasApplied) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`http://localhost:3001/opportunity/${id}/apply`, { studentId: _id });
      if (response.data.success) {
        toast.success('Application submitted successfully!');
        setHasApplied(true);
      } else {
        console.error('Failed to submit application');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.info('You have already applied for this opportunity');
      } else {
        console.error('Error submitting application', error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackClick = () => {
    navigate('/home/myopp');
  };

  const handleBackClickO = () => {
    navigate('/home/allopp');
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (!opportunity) {
    return <div>Opportunity not found.</div>;
  }

  return (
    <Container className="opp-details-page">
      <Row>
        <Col>
          <>
            {userType === 'company' && (
              <div className="button-group">
                <Button variant="primary" onClick={handleSubmitterClick}>
                  Submitter: {opportunity.submitterCount}
                </Button>
                <Button variant="success" onClick={handleEditClick}>
                  Edit this opportunity
                </Button>
                <Button variant="danger" onClick={handleDeleteClick} disabled={isDeleting}>
                  {isDeleting ? 'Deleting...' : 'Delete this opportunity'}
                </Button>
              </div>
            )}
            <div className="opportunity-info">
              { userType !== 'company' && (
              <p>
                <b>Company: </b>
                <span onClick={()=> {
                  navigate(`/home/personalcompanyn/${opportunity.companyId}`);
                }}>{companyName}</span>
              </p>
              )}
              <p>
                <b>Field: </b>
                {opportunity.field}
              </p>
              <p>
                <b>Deadline: </b>
                {format(new Date(opportunity.deadline), 'yyyy-MM-dd')}
              </p>
              <p>
                <b>Description: </b>
                {opportunity.description}
              </p>
            </div>
            {userType === 'student' && (
              <div className="button-group">
                <Button variant="primary" onClick={handleSubmitClick} disabled={hasApplied}>
                  {hasApplied ? 'Submitted' : 'Submit'}
                </Button>
              </div>
            )}
            {userType === 'company' && (
              <Button variant="secondary" onClick={handleBackClick}>
                Back to My Opportunities
              </Button>
            )}
            {userType === 'admin' && (
              <Button variant="secondary" onClick={handleBackClickO}>
                Back to All Opportunities
              </Button>
            )}
          </>
        </Col>
      </Row>
    </Container>
  );
};

export default OppDetails;
