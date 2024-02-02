import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AllCompanies.scss';
import Spinner from '../../../assets/spinner/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ConfirmDialog } from 'primereact/confirmdialog';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import user from "../../../assets/images/user.png";
import { useTranslation } from 'react-i18next';

const AllCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingCompany, setDeletingCompany] = useState(null);
  const [displayDialog, setDisplayDialog] = useState(false);
  const [companyIdToDelete, setCompanyIdToDelete] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('http://localhost:3001/companies');
        setCompanies(response.data);
      } catch (error) {
        console.error('Error fetching companies:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  const handleCompanyClick = (companyId) => {
    navigate(`/home/personalcompanyn/${companyId}`);
  };

  const confirmDelete = (companyId) => {
    setCompanyIdToDelete(companyId);
    setDisplayDialog(true);
  };

  const handleDeleteClick = async () => {
    setDisplayDialog(false);
    setDeletingCompany(companyIdToDelete);
    try {
      const response = await axios.delete(`http://localhost:3001/company/${companyIdToDelete}`);
      if (response.data.success) {
        setCompanies(companies.filter(company => company._id !== companyIdToDelete));
      } else {
        console.error('Failed to delete company account');
      }
    } catch (error) {
      console.error('Error deleting company account', error);
    } finally {
      setDeletingCompany(null);
    }
  };

  const filteredCompanies = companies.filter(company =>
    company.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Container className="all-companies-page">
          <div className="searchb dr">
            <FontAwesomeIcon icon={faSearch} className="icon-search" />
            <input
              placeholder={t('allCompanies.searchPlaceholder')}
              className="input-search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Row>
            {filteredCompanies.length > 0 ? (
              filteredCompanies.map((company) => (
                <Col md={12} key={company._id}>
                  <div className="company-card" onClick={() => handleCompanyClick(company._id)}>
                    <div className='img-com col-2'>
                      <img src={company.profileImage || user} alt={company.companyName} />
                    </div>
                    <div className='name-com col-6'>
                      <h6 className="company-name">{company.companyName}</h6>
                    </div>
                    <div className='delete-btn col-4'>
                      <Button
                        variant="danger"
                        onClick={(event) => {
                          event.stopPropagation();
                          confirmDelete(company._id);
                        }}
                        className="btn-delete"
                        disabled={deletingCompany === company._id}
                      >
                        {deletingCompany === company._id ? t('allCompanies.deleting') : t('allCompanies.deleteAccount')}
                      </Button>
                    </div>
                  </div>
                </Col>
              ))
            ) : (
              <h2>{t('allCompanies.noMatchingCompanies')}</h2>
            )}
          </Row>
          <ConfirmDialog
            visible={displayDialog}
            onHide={() => setDisplayDialog(false)}
            message={t('allCompanies.confirmMessage')}
            header={t('allCompanies.confirmHeader')}
            acceptLabel={t('allCompanies.yes')}
            rejectLabel={t('allCompanies.no')}
            acceptClassName="p-button-danger"
            accept={handleDeleteClick}
          />
        </Container>
      )}
    </>
  );
};

export default AllCompanies;