import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../../../../assets/spinner/Spinner';
import { useEmail } from '../../../../helpers/EmailContext';
import "./SelectedOpportunities.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faBan, faHourglassHalf } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';


const SelectedOpportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { _id } = useEmail();
  const [showPendingDialog, setShowPendingDialog] = useState(false);
  const [showRejectedDialog, setShowRejectedDialog] = useState(false);
  const [showAcceptedDialog, setShowAcceptedDialog] = useState(false);
  const [showInterviewDetailsDialog, setShowInterviewDetailsDialog] = useState(false);
  const [interviewDetails, setInterviewDetails] = useState(null);




  const handleClosePendingDialog = () => setShowPendingDialog(false);
  const handleCloseRejectedDialog = () => setShowRejectedDialog(false);
  const handleCloseAcceptedDialog = () => setShowAcceptedDialog(false);


  const handleOpportunityClick = (opportunity) => {
    if (opportunity.applicantStatus === 'pending') {
      setShowPendingDialog(true);
    } else if (opportunity.applicantStatus === 'rejected') {
      setShowRejectedDialog(true);
    } else if (opportunity.applicantStatus === 'accepted') {
      if (opportunity.interviewDetails && opportunity.interviewDetails.type) {
        setInterviewDetails(opportunity.interviewDetails);
        setShowInterviewDetailsDialog(true);
      } else {
        setShowAcceptedDialog(true);
      }
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
            const statusOrder = { 'accepted': 1, 'pending': 2, 'rejected': 3 };
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
              <p><b>{opp.field}</b> Opportunity at <b>{opp.companyName}</b> Company</p>
              <p className={getStatusClass(opp.applicantStatus)}><u>Status: {opp.applicantStatus}</u></p>
            </div>
          </div>
        ))
      ) : (
        <p className='no'>No opportunities found.</p>
      )}
    </div>
        <Modal show={showPendingDialog} onHide={handleClosePendingDialog}>
        <Modal.Header closeButton>
          <Modal.Title>Pending Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your request is still pending. Please check back later for an update.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePendingDialog}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showRejectedDialog} onHide={handleCloseRejectedDialog}>
        <Modal.Header closeButton>
          <Modal.Title>Rejected Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Unfortunately, you were not selected for this opportunity by the company. We wish you better luck with other opportunities.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseRejectedDialog}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showAcceptedDialog} onHide={handleCloseAcceptedDialog}>
        <Modal.Header closeButton>
          <Modal.Title>Accepted Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your application has been accepted by the company. The company will contact you soon or send you the interview details.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAcceptedDialog}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showInterviewDetailsDialog} onHide={() => setShowInterviewDetailsDialog(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Interview Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Congratulations! Your application has been accepted for an interview.
        <div>Type: {interviewDetails?.type}</div>
        <div>Date: {formatDate(interviewDetails?.date)}</div>
        <div>Time: {interviewDetails?.time}</div>
        {interviewDetails?.type === 'online' && <div>Link: <Link to={interviewDetails?.link}>{interviewDetails?.link}</Link></div>}
        {interviewDetails?.type === 'in-person' && <div>Address: {interviewDetails?.address}</div>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowInterviewDetailsDialog(false)}>Close</Button>
      </Modal.Footer>
    </Modal>

    </>
  );
};

export default SelectedOpportunities;