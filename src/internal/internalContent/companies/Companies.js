import React, { useState, useEffect } from 'react';
import { Form, InputGroup, Card, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Spinner from '../../../assets/spinner/Spinner';
import './Companies.scss';
import { Link } from 'react-router-dom';

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCompanies = companies.filter((company) =>
    company.companyName && company.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <h1>Companies</h1>
      <Form.Group controlId="formSearch">
        <Form.Label>Search for a company:</Form.Label>
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Enter company name"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </InputGroup>
      </Form.Group>

      {loading ? (
        <Spinner />
      ) : (
        <Container>
          <Row>
            {filteredCompanies.map((company) => (
              <Col key={company._id} md={4} className="mb-4">
                <Link to={`/company/${company._id}`}>
                <Card>
                  <Card.Img variant="top" src={company.profileImage || 'default-image-url.jpg'} />
                  <Card.Body>
                    <Card.Title>{company.companyName}</Card.Title>
                    <Card.Text>{company.city}</Card.Text>
                  </Card.Body>
                </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </>
  );
};

export default Companies;
