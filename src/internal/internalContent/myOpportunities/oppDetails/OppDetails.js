import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './OppDetails.scss';
import Spinner from '../../../../assets/spinner/Spinner';
import { useUserType } from '../../../../helpers/UserTypeContext';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const OppDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [opportunity, setOpportunity] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const { userType } = useUserType();
  const _id = localStorage.getItem('id');
  const { t } = useTranslation();

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
    return <div>{t('oppDetails.opportunityNotFound')}</div>;
  }

  return (
    <Container className="opp-details-page">
      <Row>
        <Col>
          <>
            {userType === 'company' && (
              <div className="button-group">
                <Button variant="primary" onClick={handleSubmitterClick}>
                  {t('oppDetails.submitterCount')}{opportunity.submitterCount}
                </Button>
                <Button variant="success" onClick={handleEditClick}>
                  {t('oppDetails.editOpportunity')}
                </Button>
                <Button variant="danger" onClick={handleDeleteClick} disabled={isDeleting}>
                  {isDeleting ? t('oppDetails.deleting') : t('oppDetails.deleteOpportunity')}
                </Button>
              </div>
            )}
            <div className="opportunity-info">
              { userType !== 'company' && (
                <p><b>{t('oppDetails.company')}</b> <span onClick={()=> navigate(`/home/personalcompanyn/${opportunity.companyId}`)}>{companyName}</span></p>
              )}
              <p><b>{t('oppDetails.field')}</b> {opportunity.field}</p>
              <p><b>{t('oppDetails.deadline')}</b> {format(new Date(opportunity.deadline), 'yyyy-MM-dd')}</p>
              <p><b>{t('oppDetails.description')}</b> {opportunity.description}</p>
            </div>
            {userType === 'student' && (
              <div className="button-group">
                <Button variant="primary" onClick={handleSubmitClick} disabled={hasApplied}>
                  {hasApplied ? t('oppDetails.submitted') : t('oppDetails.submit')}
                </Button>
              </div>
            )}
            {userType === 'company' && (
              <Button variant="secondary" onClick={handleBackClick}>
                {t('oppDetails.backToMyOpportunities')}
              </Button>
            )}
            {userType === 'admin' && (
              <Button variant="secondary" onClick={handleBackClickO}>
                {t('oppDetails.backToAllOpportunities')}
              </Button>
            )}
          </>
        </Col>
      </Row>
    </Container>
  );
};

export default OppDetails;