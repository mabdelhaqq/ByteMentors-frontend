import React from 'react';
import { Link } from 'react-router-dom';
import './Option.scss';

const Option = () => {
  return (
    <div className="option-container">
      <Link to='/login/option/registers' className='link-box'><div className="option-box student">
        <h2>Student</h2>
        <p>Register as a student to explore training opportunities.</p>
      </div></Link>
      <Link to='/login/option/registerc' className='link-box'><div className="option-box company">
        <h2>Company</h2>
        <p>Register as a company to connect with talented individuals.</p>
      </div></Link>
    </div>
  );
};

export default Option;
