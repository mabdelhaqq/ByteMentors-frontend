import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import './PersonalCompanyN.scss';
import Spinner from '../../../assets/spinner/Spinner';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const PersonalCompanyN = () => {
  const [company, setCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchCompany = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:3001/company/${id}`);
        if (response.data.success) {
          setCompany(response.data.company);
        } else {
          console.error('Failed to fetch company details');
        }
      } catch (error) {
        console.error('Error fetching company details', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCompany();
  }, [id]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!company) {
    return <div>{t('personalCompanyN.companyNotFound')}</div>;
  }

  return (
    <Container className="personal-company-page">
      <Row>
        <Col md={12}>
          <div className="image">
            {company.profileImage && (
              <img
                src={company.profileImage}
                alt={t('personalCompanyN.companyName', { name: company.companyName })}
                className="profile-image-preview"
              />
            )}
          </div>
        </Col>
        <Col md={12}>
          <div className="name">
            <h2>{company.companyName}</h2>
          </div>
        </Col>
        {company.description && (
          <Col md={12}>
            <div className="description">
              <p>{company.description}</p>
            </div>
          </Col>
        )}
        <Col md={12}>
          <div className="location-phone">
            <div className='location col-12 col-sm-6'><p><b>{t('personalCompanyN.location')} </b>{company.city}</p></div>
            <div className='phone col-12 col-sm-6'><p><b>{t('personalCompanyN.phoneNumber')} </b>{company.phoneNumber}</p></div>
          </div>
        </Col>
        <Col md={12}>
          <div className="email-linkedin">
            <div className='email col-12 col-sm-6'><p><b>{t('personalCompanyN.email')} </b>{company.email}</p></div>
            {company.linkedin && (
              <div className='linkedin col-12 col-sm-6'>
                <p><b>{t('personalCompanyN.linkedin')} </b>
                <a href={company.linkedin} target="_blank" rel="noopener noreferrer">{company.linkedin}</a></p>
              </div>
            )}
            {company.website && (
              <div className='website col-12 col-sm-6'>
                <p><b>{t('personalCompanyN.website')} </b>
                <a href={company.website} target="_blank" rel="noopener noreferrer">{company.website}</a></p>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PersonalCompanyN;