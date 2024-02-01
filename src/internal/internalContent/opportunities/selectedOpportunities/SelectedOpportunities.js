import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../../../../assets/spinner/Spinner';
import "./SelectedOpportunities.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faBan, faHourglassHalf, faClipboardQuestion } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


const SelectedOpportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const _id = localStorage.getItem('id');
  const [showPendingDialog, setShowPendingDialog] = useState(false);
  const [showRejectedDialog, setShowRejectedDialog] = useState(false);
  const [showAcceptedDialog, setShowAcceptedDialog] = useState(false);
  const [showInterviewDetailsDialog, setShowInterviewDetailsDialog] = useState(false);
  const [interviewDetails, setInterviewDetails] = useState(null);
  const { t } = useTranslation();


  const handleClosePendingDialog = () => setShowPendingDialog(false);
  const handleCloseRejectedDialog = () => setShowRejectedDialog(false);
  const handleCloseAcceptedDialog = () => setShowAcceptedDialog(false);


  const handleOpportunityClick = (opportunity) => {
    if (opportunity.applicantStatus === 'pending') {
      setShowPendingDialog(true);
    } else if (opportunity.applicantStatus === 'rejected') {
      setShowRejectedDialog(true);
    } else if (opportunity.applicantStatus === 'accepted') {
      setShowAcceptedDialog(true);
    } else if (opportunity.applicantStatus === 'waiting') {
      setInterviewDetails(opportunity.interviewDetails);
      setShowInterviewDetailsDialog(true);
    }
  };
  
  const fetchCompanyName = async (companyId) => {
    try {
      const response = await axios.get(`http://localhost:3001/company/${companyId}`);
      return response.data.company.companyName;
    } catch (error) {
      console.error('Error fetching company name:', error);
      return 'Unknown Company';
    }
  };

  useEffect(() => {
    const fetchOpportunities = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:3001/student/${_id}/opportunities`);
        if (response.data.success) {
          const sortedOpps = await Promise.all(
            response.data.opportunities.map(async (opp) => {
              const companyName = await fetchCompanyName(opp.companyId._id);
              return { ...opp, companyName };
            })
          );
          sortedOpps.sort((a, b) => {
            const statusOrder = { 'accepted': 1, 'waiting': 2, 'pending':3, 'rejected': 3 };
            return statusOrder[a.applicantStatus] - statusOrder[b.applicantStatus];
          });
  
          setOpportunities(sortedOpps);
        }
      } catch (error) {
        console.error('Error fetching opportunities:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOpportunities();
  }, [_id]);
  const getStatusIcon = (status) => {
    switch (status) {
      case 'accepted':
        return <FontAwesomeIcon icon={faCircleCheck} className="icon-accepted" />;
      case 'rejected':
        return <FontAwesomeIcon icon={faBan} className="icon-rejected" />;
      case 'waiting':
        return <FontAwesomeIcon icon={faClipboardQuestion} className="icon-waiting" />;
      case 'pending':
      default:
        return <FontAwesomeIcon icon={faHourglassHalf} className="icon-pending" />;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'accepted':
        return 'status-accepted';
      case 'rejected':
        return 'status-rejected';
        case 'waiting':
          return 'status-waiting';
      case 'pending':
      default:
        return 'status-pending';
    }
  };
  const formatDate = (dateString) => {
    if (dateString) {
      return format(new Date(dateString), 'yyyy-MM-dd');
    }
    return null;
  };
  
  

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
    <div className='s-opp-page'>
      {opportunities.length > 0 ? (
        opportunities.map((opp) => (
          <div key={opp._id} className='opp-card' onClick={() => handleOpportunityClick(opp)}>
            <div className='fontaw col-1'>
              {getStatusIcon(opp.applicantStatus)}
            </div>
            <div className='information col-11'>
              <p>{t('selectedOpportunities.opportunityAtCompany', { field: opp.field, companyName: opp.companyName })}</p>
              {opp.applicantStatus!=='waiting' && <p className={getStatusClass(opp.applicantStatus)}><u>{t('selectedOpportunities.status', { status: opp.applicantStatus })}</u></p>}
              {opp.applicantStatus==='waiting' && <p className={getStatusClass(opp.applicantStatus)}><u>{t('selectedOpportunities.waitingForInterview')}</u></p>}
            </div>
          </div>
        ))
      ) : (
        <p className='no'>{t('selectedOpportunities.noOpportunitiesFound')}</p>
      )}
    </div>
    <Modal show={showPendingDialog} onHide={handleClosePendingDialog}>
        <Modal.Header closeButton>
          <Modal.Title>{t('selectedOpportunities.pendingRequest')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {t('selectedOpportunities.pendingRequestMessage')}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePendingDialog}>
            {t('selectedOpportunities.close')}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showRejectedDialog} onHide={handleCloseRejectedDialog}>
        <Modal.Header closeButton>
          <Modal.Title>{t('selectedOpportunities.rejectedRequest')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {t('selectedOpportunities.rejectedRequestMessage')}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseRejectedDialog}>
            {t('selectedOpportunities.close')}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showAcceptedDialog} onHide={handleCloseAcceptedDialog}>
        <Modal.Header closeButton>
          <Modal.Title>{t('selectedOpportunities.acceptedRequest')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {t('selectedOpportunities.acceptedRequestMessage')}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAcceptedDialog}>
            {t('selectedOpportunities.close')}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showInterviewDetailsDialog} onHide={() => setShowInterviewDetailsDialog(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{t('selectedOpportunities.interviewDetails')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {t('selectedOpportunities.interviewDetailsMessage')}
          <div>{t('selectedOpportunities.interviewType', { type: interviewDetails?.type })}</div>
          <div>{t('selectedOpportunities.interviewDate', { date: formatDate(interviewDetails?.date) })}</div>
          <div>{t('selectedOpportunities.interviewTime', { time: interviewDetails?.time })}</div>
          {interviewDetails?.type === 'online' && (
            <div>{t('selectedOpportunities.interviewLink', { link: interviewDetails?.link })}</div>
          )}
          {interviewDetails?.type === 'in-person' && (
            <div>{t('selectedOpportunities.interviewAddress', { address: interviewDetails?.address })}</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowInterviewDetailsDialog(false)}>
            {t('selectedOpportunities.close')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SelectedOpportunities;