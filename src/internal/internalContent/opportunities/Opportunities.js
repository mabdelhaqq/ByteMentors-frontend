import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../../../assets/spinner/Spinner';
import './Opportunities.scss';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
import { Button } from 'react-bootstrap';
import cities from "../../../helpers/cities";
import fields from "../../../helpers/fields";

const Opportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedField, setSelectedField] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [sortBy, setSortBy] = useState('deadline');
  const navigate = useNavigate();

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const fetchCompanyName = async (companyId) => {
    try {
      const response = await axios.get(`http://localhost:3001/company/${companyId}`);
      return response.data.company.companyName;
    } catch (error) {
      console.error('Error fetching company name:', error);
      return 'Unknown Company';
    }
  };
  const fetchCompanyLocation = async (companyId) => {
    try {
      const response = await axios.get(`http://localhost:3001/company/${companyId}`);
      return response.data.company.city;
    } catch (error) {
      console.error('Error fetching company location:', error);
      return 'Unknown Location';
    }
  };

  const fetchOpportunities = async () => {
    try {
      const response = await axios.get('http://localhost:3001/opportunitiesd');
      const opportunitiesWithCompanyData = await Promise.all(
        response.data.map(async (opportunity) => {
          const companyName = await fetchCompanyName(opportunity.companyId);
          const companyLocation = await fetchCompanyLocation(opportunity.companyId);
          return { ...opportunity, companyName, companyLocation };
        })
      );
      setOpportunities(opportunitiesWithCompanyData);
    } catch (error) {
      console.error('Error fetching opportunities:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredOpportunities = opportunities
    .filter((opportunity) =>
      (!selectedField || opportunity.field.toLowerCase().includes(selectedField.toLowerCase())) &&
      (!selectedCity || opportunity.companyLocation.toLowerCase() === selectedCity.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.deadline) - new Date(a.deadline);
      } else {
        return new Date(a.deadline) - new Date(b.deadline);
      }
    });

  const handleSelectedOpportunitiesClick = () => {
    navigate('/home/selected');
  };

  return (
    <div className='op-page'>
      <div className='btn-div'>
        <Button onClick={handleSelectedOpportunitiesClick} className="selected-opportunities-btn">Selected Opportunities</Button>
      </div>
      <div className="filter-section">
        <div className='field col-12 col-md-5'>
      <label className='col-2 col-md-3'>Field:</label>
        <select className='col-10 col-md-9'
          value={selectedField}
          onChange={(e) => setSelectedField(e.target.value)}
        >
          <option value="">All Fields</option>
          {fields.map((field) => (
            <option key={field} value={field}>
              {field}
            </option>
          ))}
        </select>
        </div>
        <div className='city col-12 col-md-3'>
        <label className='col-2 col-md-3'>City:</label>
        <select className='col-10 col-md-9'
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          <option value="">All Cities</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        </div>
        <div className='sort col-12 col-md-4'>
        <label className='col-2 col-md-3'>Sort By:</label>
        <select className='col-10 col-md-9'
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="deadline">Deadline approaches</option>
          <option value="newest">Newest</option>
        </select>
        </div>
      </div>
      <div className="searchb">
        <FontAwesomeIcon icon={faSearch} className="icon-search" />
        <input
          placeholder="Search for an opportunity from a specific company"
          className="input-search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          {filteredOpportunities.map((opportunity) => (
            <div key={opportunity._id} className="col-12 mb-1">
              <Link to={`/home/myopp/${opportunity._id}`} className='link-card'>
                <div className='item-op'>
                  <div className='field-opp'><p>Opportunity in the field of <b>{opportunity.field}</b> at <b>{opportunity.companyName}</b> company</p></div>
                  <div className='dl-opp'><p>Available until: <b>{format(new Date(opportunity.deadline), 'yyyy-MM-dd')}</b></p></div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Opportunities;