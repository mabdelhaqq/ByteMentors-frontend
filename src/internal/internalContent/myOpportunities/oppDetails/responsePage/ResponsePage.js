import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ResponsePage.scss';
import { Button, Modal, Form } from 'react-bootstrap';
import Spinner from '../../../../../assets/spinner/Spinner';
import { useParams, useNavigate } from 'react-router-dom';
import user from '../../../../../assets/images/user.png';
import { ConfirmDialog } from 'primereact/confirmdialog';

const ResponsePage = () => {
  const [pendingApplicants, setPendingApplicants] = useState([]);
  const [acceptedApplicants, setAcceptedApplicants] = useState([]);
  const [rejectedApplicants, setRejectedApplicants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [acceptDialogVisible, setAcceptDialogVisible] = useState(false);
  const [rejectDialogVisible, setRejectDialogVisible] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [interviewType, setInterviewType] = useState('');
  const [interviewDate, setInterviewDate] = useState('');
  const [interviewTime, setInterviewTime] = useState('');
  const [interviewLink, setInterviewLink] = useState('');
  const [interviewAddress, setInterviewAddress] = useState('');
  const { id } = useParams();
  const opportunityId = id;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/opportunity/${opportunityId}/applicants`);
        if (response.data.length > 0) {
          const pending = [], accepted = [], rejected = [];
          response.data.forEach(applicant => {
            switch (applicant.status) {
              case 'accepted':
                accepted.push(applicant);
                break;
              case 'rejected':
                rejected.push(applicant);
                break;
              default:
                pending.push(applicant);
            }
          });
          setPendingApplicants(pending);
          setAcceptedApplicants(accepted);
          setRejectedApplicants(rejected);
        }
      } catch (error) {
        console.error('Error fetching applicants', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplicants();
  }, [opportunityId]);

  const handleStudentClick = (studentId) => {
    navigate(`/home/personalstudentn/${studentId}`);
  };

  const handleAcceptClick = async (event, studentId) => {
    event.stopPropagation();
    setSelectedStudentId(studentId);
    setAcceptDialogVisible(true);
  };

  const confirmAccept = async () => {
    try {
      const response = await axios.post(`http://localhost:3001/opportunity/${opportunityId}/accept/${selectedStudentId}`);
      if (response.data.success) {
        updateApplicantStatus('accepted', selectedStudentId);
      } else {
        console.error('Failed to accept applicant');
      }
    } catch (error) {
      console.error('Error accepting applicant', error);
    }
    setAcceptDialogVisible(false);
  };

  const handleRejectClick = async (event, studentId) => {
    event.stopPropagation();
    setSelectedStudentId(studentId);
    setRejectDialogVisible(true);
  };

  const confirmReject = async () => {
    try {
      const response = await axios.post(`http://localhost:3001/opportunity/${opportunityId}/reject/${selectedStudentId}`);
      if (response.data.success) {
        updateApplicantStatus('rejected', selectedStudentId);
      } else {
        console.error('Failed to reject applicant');
      }
    } catch (error) {
      console.error('Error rejecting applicant', error);
    }
    setRejectDialogVisible(false);
  };

  const openInterviewModal = (studentId) => {
    setSelectedStudentId(studentId);
    setShowInterviewModal(true);
  };

  const closeInterviewModal = () => {
    setShowInterviewModal(false);
  };

  const handleInterviewSubmit = async () => {
    if (!interviewType || !interviewDate || !interviewTime || (interviewType === 'online' && !interviewLink) || (interviewType === 'in-person' && !interviewAddress)) {
      alert("Please fill in all fields.");
      return;
    }
  
    try {
      const interviewData = {
        interviewType,
        interviewDate,
        interviewTime,
        ...(interviewType === 'online' ? { interviewLink } : {}),
        ...(interviewType === 'in-person' ? { interviewAddress } : {}),
      };
      await axios.post(`http://localhost:3001/opportunity/${opportunityId}/scheduleInterview/${selectedStudentId}`, interviewData);
      closeInterviewModal();
    } catch (error) {
      console.error('Error scheduling interview', error);
    }
  };
  const updateApplicantStatus = (newStatus, studentId) => {
    setPendingApplicants(prev => prev.filter(applicant => applicant._id !== studentId));
    const updatedApplicant = [...pendingApplicants, ...acceptedApplicants, ...rejectedApplicants].find(applicant => applicant._id === studentId);
    updatedApplicant.status = newStatus;

    if (newStatus === 'accepted') {
      setAcceptedApplicants(prev => [...prev, updatedApplicant]);
    } else {
      setRejectedApplicants(prev => [...prev, updatedApplicant]);
    }
  };
  const totalApplicants = pendingApplicants.length + acceptedApplicants.length + rejectedApplicants.length;


  return (
    <div className="response-page">
      <ConfirmDialog 
        visible={rejectDialogVisible} 
        onHide={() => setRejectDialogVisible(false)} 
        message="Are you sure you want to reject this applicant?" 
        header="Confirmation" 
        icon="pi pi-exclamation-triangle" 
        accept={confirmReject} 
        reject={() => setRejectDialogVisible(false)}
      />
      <ConfirmDialog 
        visible={acceptDialogVisible} 
        onHide={() => setAcceptDialogVisible(false)} 
        message="Are you sure you want to accept this applicant?" 
        header="Confirmation" 
        icon="pi pi-exclamation-triangle" 
        accept={confirmAccept} 
        reject={() => setAcceptDialogVisible(false)}
      />

      {/* Interview Modal */}
      <Modal show={showInterviewModal} onHide={closeInterviewModal}>
        <Modal.Header closeButton>
          <Modal.Title>Schedule Interview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Check 
                type="radio" 
                label="Face to Face" 
                name="interviewType" 
                value="in-person" 
                onChange={(e) => setInterviewType(e.target.value)} 
              />
              <Form.Check 
                type="radio" 
                label="Online" 
                name="interviewType" 
                value="online" 
                onChange={(e) => setInterviewType(e.target.value)} 
              />
            </Form.Group>
            {interviewType === 'in-person' && (
              <Form.Control 
                type="text" 
                placeholder="Location" 
                onChange={(e) => setInterviewAddress(e.target.value)} 
              />
            )}
            {interviewType === 'online' && (
              <Form.Control 
                type="text" 
                placeholder="Meeting Link" 
                onChange={(e) => setInterviewLink(e.target.value)} 
              />
            )}
            <Form.Control 
              type="date" 
              onChange={(e) => setInterviewDate(e.target.value)} 
            />
            <Form.Control 
              type="time" 
              onChange={(e) => setInterviewTime(e.target.value)} 
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeInterviewModal}>Cancel</Button>
          <Button variant="primary" onClick={handleInterviewSubmit}>Save</Button>
        </Modal.Footer>
      </Modal>

      {isLoading ? <Spinner /> : (
        <>
          {totalApplicants === 0 ? (
            <div className="no-applicants">
              <h2>No Applicants</h2>
              <p>There are no applicants for this opportunity yet.</p>
            </div>
          ) : (
            <>
              {acceptedApplicants.length > 0 && (
                <ApplicantSection 
                  className="accepted" 
                  title="Accepted Responses" 
                  applicants={acceptedApplicants} 
                  onClick={handleStudentClick}
                  openInterviewModal={openInterviewModal} 
                />
              )}
              {pendingApplicants.length > 0 && (
                <ApplicantSection 
                  className="pending" 
                  title="Pending Responses" 
                  applicants={pendingApplicants} 
                  onAccept={handleAcceptClick} 
                  onReject={handleRejectClick}
                  openInterviewModal={openInterviewModal}
                />
              )}
              {rejectedApplicants.length > 0 && (
                <ApplicantSection 
                  className="rejected" 
                  title="Rejected Responses" 
                  applicants={rejectedApplicants} 
                  onClick={handleStudentClick}
                  openInterviewModal={openInterviewModal}
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

const ApplicantSection = ({ title, applicants, onClick, onAccept, onReject, className, openInterviewModal }) => (
  <div className={className}>
    <h2>{title}</h2>
    {applicants.map(applicant => (
      <div key={applicant._id} className='applicant-box' onClick={() => onClick(applicant._id)}>
        <div className="applicant-image col-2">
          <img src={applicant.profileImage || user} alt={applicant.name} />
        </div>
        <div className="applicant-info col-5">
          <h6>{applicant.name}</h6>
        </div>
        <div className="applicant-actions col-5">
          {onAccept && onReject && (
            <>
              <Button variant="success" onClick={(event) => onAccept(event, applicant._id)}>
                Accept
              </Button>
              <Button variant="danger" onClick={(event) => onReject(event, applicant._id)}>
                Reject
              </Button>
            </>
          )}
          {applicant.status === 'rejected' && (
            <Button variant="danger" onClick={(event) => {event.stopPropagation()}} className='rejected-btn'>Rejected</Button>
          )}
          {applicant.status === 'accepted' && (
            <Button 
              variant="secondary" 
              onClick={(event) => {
                event.stopPropagation();
                openInterviewModal(applicant._id);
              }}
              className='aceepted-btn'
            >
              Schedule an interview
            </Button>
          )}
        </div>
      </div>
    ))}
  </div>
);

export default ResponsePage;
