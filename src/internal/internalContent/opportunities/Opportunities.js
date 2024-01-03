import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../../../assets/spinner/Spinner';
import './Opportunities.scss';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
import { Button } from 'react-bootstrap';

const Opportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
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
      const fetchOpportunities = async () => {
        try {
          const response = await axios.get('http://localhost:3001/opportunitiesd');
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

      const filteredOpportunities = opportunities.filter((opportunity) =>
        opportunity.field && opportunity.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleSelectedOpportunitiesClick = () => {
    navigate('/home/selected');
};

      
  return (
    <div className='op-page'>
      <div className='btn-div'>
      <Button onClick={handleSelectedOpportunitiesClick} className="selected-opportunities-btn">Selected Opportunities</Button>
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
  )
}

export default Opportunities