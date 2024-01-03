import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../../../../assets/spinner/Spinner';
import './PlanDetails.scss';
import ReactMarkdown from 'react-markdown';
import { useUserType } from '../../../../helpers/UserTypeContext';
import { ConfirmDialog } from 'primereact/confirmdialog';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const PlanDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plan, setPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { userType } = useUserType();
  const [displayDialog, setDisplayDialog] = useState(false);
  const [planIdToDelete, setPlanIdToDelete] = useState(null);

  useEffect(() => {
    const fetchPlanDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/plans/${id}`);
        if (response.data.success) {
          setPlan(response.data.plan);
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

  const handleEditClick = () => {
    navigate(`/home/allplans/edit/${id}`);
  };
  const handleBackClick = () => {
    navigate('/home/allplans');
  };
  const confirmDelete = () => {
    setPlanIdToDelete(id);
    setDisplayDialog(true);
  };

  const handleDeleteClick = async () => {
      try {
      const response = await axios.delete(`http://localhost:3001/plan/${id}`);
  
      if (response.data.success) {
        navigate('/home/allplans');
      } else {
        console.error('Failed to delete plan');
      }
    } catch (error) {
      console.error('Error deleting plan', error);
    }
  };
  if (isLoading) {
    return <Spinner />;
  }

  if (!plan) {
    return <div>Plan not found.</div>;
  }

  return (
    <Container className="plan-details-page">
      <Row>
        <Col md={12}>
          {userType === 'admin'&&(<div className="buttons-container">
            <Button variant="primary" onClick={handleEditClick}>Edit this plan</Button>
            <Button variant="danger" onClick={confirmDelete}>Delete this plan</Button>
          </div>)}
          <div className="plan-info">
            <h3>Field: {plan.field}</h3>
            <ReactMarkdown>{plan.description}</ReactMarkdown>
          </div>
          <Button variant="secondary" onClick={handleBackClick}>
              Back to My Plans
            </Button>
        </Col>
      </Row>
      <ConfirmDialog
            visible={displayDialog}
            onHide={() => setDisplayDialog(false)}
            message="Are you sure you want to delete this plan?"
            header="Confirmation"
            icon="pi pi-exclamation-triangle"
            acceptLabel="Yes"
            rejectLabel="No"
            acceptClassName="p-button-danger"
            accept={handleDeleteClick}
          />
    </Container>
  );
};

export default PlanDetails;