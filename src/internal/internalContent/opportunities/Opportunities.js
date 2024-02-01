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
import { useTranslation } from 'react-i18next';

const Opportunities = () => {
  const [recommendedOpportunities, setRecommendedOpportunities] = useState([]);
  const [otherOpportunities, setOtherOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const _id = localStorage.getItem('id');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedField, setSelectedField] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [sortBy, setSortBy] = useState('deadline');
  const [allOpportunities, setAllOpportunities] = useState([]);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const themeMode = localStorage.getItem('themeMode');

  useEffect(() => {
    fetchOpportunities();
  }, [searchTerm, selectedField, selectedCity, sortBy]);

  const fetchOpportunities = async () => {
    setLoading(true);
    try {
      const recommendedResponse = await axios.get(`http://localhost:5000/jobs/recommend?user_id=${_id}&num_recs=3`);
      const processedRecommended = await processOpportunities(recommendedResponse.data.job_recommendations);
      setRecommendedOpportunities(processedRecommended);
  
      const otherResponse = await axios.get('http://localhost:3001/opportunities');
      const filteredOther = otherResponse.data.filter(opportunity =>
        !processedRecommended.some(recOpportunity => recOpportunity.job_info._id.$oid === opportunity._id)
      );  
      const processedOther = await processOpportunitiesO(filteredOther);
      setOtherOpportunities(processedOther);
      setAllOpportunities([...processedRecommended, ...processedOther]);
    } catch (error) {
      console.error('Error fetching opportunities:', error);
    } finally {
      setLoading(false);
    }
  };

  const processOpportunities = async (opportunities) => {
    return Promise.all(opportunities.map(async (opportunity) => {
      const companyName = await fetchCompanyName(opportunity.job_info.companyId.$oid);
      const companyLocation = await fetchCompanyLocation(opportunity.job_info.companyId.$oid);
      return { ...opportunity, companyName, companyLocation };
    }));
  };

  const processOpportunitiesO = async (opportunities) => {
    return Promise.all(opportunities.map(async (opportunity) => {
      const companyName = await fetchCompanyName(opportunity.companyId);
      const companyLocation = await fetchCompanyLocation(opportunity.companyId);
      return { ...opportunity, companyName, companyLocation };
    }));
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

  const fetchCompanyLocation = async (companyId) => {
    try {
      const response = await axios.get(`http://localhost:3001/company/${companyId}`);
      return response.data.company.city;
    } catch (error) {
      console.error('Error fetching company location:', error);
      return 'Unknown Location';
    }
  };

  const filteredAndSortedOpportunities = recommendedOpportunities
    .filter(opportunity =>
      (!selectedField || (opportunity.job_info.field && opportunity.job_info.field.toLowerCase().includes(selectedField.toLowerCase()))) &&
      (!selectedCity || (opportunity.companyLocation && opportunity.companyLocation.toLowerCase() === selectedCity.toLowerCase())) &&
      (opportunity.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (opportunity.field && opportunity.field.toLowerCase().includes(searchTerm.toLowerCase())))
    )
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.job_info.deadline.$date) - new Date(a.job_info.deadline.$date);
      } else {
        return new Date(a.job_info.deadline.$date) - new Date(b.job_info.deadline.$date);
      }
    });

  const filteredAndSortedOpportunitiesO = otherOpportunities
    .filter(opportunity =>
      (!selectedField || (opportunity.field && opportunity.field.toLowerCase().includes(selectedField.toLowerCase()))) &&
      (!selectedCity || (opportunity.companyLocation && opportunity.companyLocation.toLowerCase() === selectedCity.toLowerCase())) &&
      (opportunity.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (opportunity.field && opportunity.field.toLowerCase().includes(searchTerm.toLowerCase())))
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
        <Button onClick={handleSelectedOpportunitiesClick} className="selected-opportunities-btn">{t('opportunity.selectedOpportunities')}</Button>
      </div>
      <div className="filter-section">
        <div className='field col-12 col-md-5'>
          <label className='col-2 col-md-3'>{t('opportunity.fieldLabel')}:</label>
          <select className='col-10 col-md-9 dr'
            value={selectedField}
            onChange={(e) => setSelectedField(e.target.value)}
          >
            <option value="">{t('opportunity.allFields')}</option>
            {fields.map((field) => (
              <option key={field} value={field}>
                {field}
              </option>
            ))}
          </select>
        </div>
        <div className='city col-12 col-md-3'>
          <label className='col-2 col-md-3'>{t('opportunity.cityLabel')}:</label>
          <select className='col-10 col-md-9 dr'
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <option value="">{t('opportunity.allCities')}</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <div className='sort col-12 col-md-4'>
          <label className='col-2 col-md-3'>{t('opportunity.sortByLabel')}:</label>
          <select className='col-10 col-md-9 dr'
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="deadline">{t('opportunity.deadlineApproaches')}</option>
            <option value="newest">{t('opportunity.newest')}</option>
          </select>
        </div>
      </div>
      <div className="searchb dr">
        <FontAwesomeIcon icon={faSearch} className="icon-search" />
        <input
          placeholder={t('opportunity.searchPlaceholder')}
          className="input-search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          {filteredAndSortedOpportunities.length > 0 && (
            <div>
              <div className="recommended-title">
                <h2>{t('opportunity.opportunitiesYouMayLike')}</h2>
                {filteredAndSortedOpportunities.map((opportunity) => (
                  <div key={opportunity.job_info._id.$oid} className="col-12 mb-1">
                    <Link to={`/home/myopp/${opportunity.job_info._id.$oid}`} className={`link-card ${themeMode}`}>
                      <div className='item-op'>
                        <div className='sh'>
                          <div className='field-opp'><p>{t('opportunity.fieldLabel')}: <b>{opportunity.job_info.field}</b> at <b>{opportunity.companyName} company</b></p></div>
                          <div className='dl-opp'><p>Available until: <b>{format(new Date(opportunity.job_info.deadline.$date), 'yyyy-MM-dd')}</b></p></div>
                        </div>
                        <div className='dl-reco'><p><b>{t('opportunity.recommendedForYou')}</b></p></div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
          {filteredAndSortedOpportunitiesO.length > 0 && (
            <div className='other-title'>
              <h2>{t('opportunity.otherOpportunities')}</h2>
              {filteredAndSortedOpportunitiesO.map((opportunity) => (
                <div key={opportunity._id} className="col-12 mb-1">
                  <Link to={`/home/myopp/${opportunity._id}`} className='link-card'>
                    <div className='item-op'>
                      <div className='sh'>
                        <div className='field-opp'><p>{t('opportunity.fieldLabel')}: <b>{opportunity.field}</b> at <b>{opportunity.companyName} company</b></p></div>
                        <div className='dl-opp'><p>Available until: <b>{format(new Date(opportunity.deadline), 'yyyy-MM-dd')}</b></p></div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
          {filteredAndSortedOpportunities.length === 0 && filteredAndSortedOpportunitiesO.length === 0 && (
            <p className='no-match'>{t('opportunity.noMatchingOpportunitiesFound')}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Opportunities;
