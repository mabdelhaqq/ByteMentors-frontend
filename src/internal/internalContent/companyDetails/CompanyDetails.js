import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../../../assets/spinner/Spinner';

const CompanyDetails = () => {
  const { companyId } = useParams();
  const [companyDetails, setCompanyDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
        if(!companyId){
            return;
        }
        try {
          const response = await axios.get(`http://localhost:3001/companies/${companyId}`);
          setCompanyDetails(response.data);
        } catch (error) {
          console.error('Error fetching company details:', error);
        } finally {
          setLoading(false);
        }
      };
    fetchCompanyDetails();
  }, [companyId]);



  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <h2>{companyDetails.companyName}</h2>
          <img src={companyDetails.profileImage} alt={companyDetails.companyName} />
          <p>Email: {companyDetails.email}</p>
          <p>Phone: {companyDetails.phoneNumber}</p>
          <p>LinkedIn: {companyDetails.linkedin}</p>
          <p>Description: {companyDetails.description}</p>
        </div>
      )}
    </div>
  );
};

export default CompanyDetails;
