import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AllOpportunities.scss';
import Spinner from '../../../assets/spinner/Spinner';
import { ConfirmDialog } from 'primereact/confirmdialog';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import fields from "../../../helpers/fields"


const AllOpportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingOpportunity, setDeletingOpportunity] = useState(null);
  const [displayDialog, setDisplayDialog] = useState(false);
  const [opportunityIdToDelete, setOpportunityIdToDelete] = useState(null);
  const [filter, setFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const fetchCompanyName = async (companyId) => {
    try {
      const response = await axios.get(`http://localhost:3001/company/${companyId}`);
      return response.data.company.companyName;
    } catch (error) {
      console.error('Error fetching company name:', error);
      return 'Unknown Company';
    }
  };

  const fetchOpportunities = async () => {
    try {
      const response = await axios.get('http://localhost:3001/opportunities');
      const opportunitiesWithCompanyNames = await Promise.all(
        response.data.map(async (opportunity) => {
          const companyName = await fetchCompanyName(opportunity.companyId);
          return { ...opportunity, companyName };
        })
      );
      setOpportunities(opportunitiesWithCompanyNames);
    } catch (error) {
      console.error('Error fetching opportunities:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, [filter, searchTerm]);

  const handleOpportunityClick = (opportunityId) => {
    navigate(`/home/myopp/${opportunityId}`);
  };

  const confirmDelete = (opportunityId) => {
    setOpportunityIdToDelete(opportunityId);
    setDisplayDialog(true);
  };

  const handleDeleteClick = async () => {
    setDisplayDialog(false);
    setDeletingOpportunity(opportunityIdToDelete);

    try {
      const response = await axios.delete(`http://localhost:3001/opportunity/${opportunityIdToDelete}`);
      if (response.data.success) {
        setOpportunities((prevOpportunities) => prevOpportunities.filter((opportunity) => opportunity._id !== opportunityIdToDelete));
      } else {
        console.error('Failed to delete opportunity');
      }
    } catch (error) {
      console.error('Error deleting opportunity', error);
    } finally {
      setDeletingOpportunity(null);
    }
  };

  const filteredAndSearchedOpportunities = opportunities.filter(opportunity =>
    (filter === '' || opportunity.field === filter) &&
    opportunity.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Container className="all-opportunities-page">
          <Row className='addition'>
          <Col className='select col-12'>
              <Form.Select value={filter} onChange={(e) => setFilter(e.target.value)} className='internal-select'>
                <option value="">All Fields</option>
                {fields.map((field, index) => (
                  <option key={index} value={field}>{field}</option>
                ))}
              </Form.Select>
            </Col>
            <Col className='search col-12'>
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
              <Form.Control
                type="text"
                placeholder="Search by Company Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='in'
              />
            </Col>
          </Row>
          <Row className='mainn'>
            {filteredAndSearchedOpportunities.length > 0 ? (
              filteredAndSearchedOpportunities.map((opportunity) => (
                <Col md={12} key={opportunity._id}>
                  <div className="opportunity-card" onClick={() => handleOpportunityClick(opportunity._id)}>
                    <div className="opportunity-details">
                      <p className="opportunity-field">{opportunity.field}</p>
                      <p className="opportunity-company">{opportunity.companyName}</p>
                    </div>
                    <Button
                      variant="danger"
                      onClick={(event) => {
                        event.stopPropagation();
                        confirmDelete(opportunity._id);
                      }}
                      className="btn-delete"
                      disabled={deletingOpportunity === opportunity._id}
                    >
                      {deletingOpportunity === opportunity._id ? 'Deleting...' : 'Delete Opportunity'}
                    </Button>
                  </div>
                </Col>
              ))
            ) : (
              <Col>
                <h2>There are no opportunities for the selected criteria</h2>
              </Col>
            )}
          </Row>
          <ConfirmDialog
            visible={displayDialog}
            onHide={() => setDisplayDialog(false)}
            message="Are you sure you want to delete this opportunity?"
            header="Confirmation"
            icon="pi pi-exclamation-triangle"
            acceptLabel="Yes"
            rejectLabel="No"
            acceptClassName="p-button-danger"
            accept={handleDeleteClick}
          />
        </Container>
      )}
    </>
  );
};

export default AllOpportunities;