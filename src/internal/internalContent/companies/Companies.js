import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Spinner from '../../../assets/spinner/Spinner';
import './Companies.scss';
import { Link } from 'react-router-dom';
import user from "../../../assets/images/user.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    fetchCompanies();
  }, []);

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

  const filteredCompanies = companies.filter((company) =>
    company.companyName && company.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className='cmp-page'>
      <div className="searchb dr">
        <FontAwesomeIcon icon={faSearch} className="icon-search" />
        <input
          placeholder={t('companies.searchPlaceholder')}
          className="input-search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <Container>
          <Row>
            {filteredCompanies.map((company) => (
              <Col key={company._id} className="col-6 col-md-4 col-xl-3 mb-1">
                <Link to={`/home/personalcompanyn/${company._id}`} className='link-card'>
                  <Card className='card'>
                    <Card.Img className='img-card' variant="top" src={company.profileImage || user}/>
                    <Card.Body className='dr'>
                      <Card.Title className='title-card'>{company.companyName}</Card.Title>
                      <Card.Text className='city-card'>{company.city}</Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </Container>
  );
};

export default Companies;