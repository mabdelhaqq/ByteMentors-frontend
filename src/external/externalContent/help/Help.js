import React from 'react';
import { Link } from 'react-router-dom';
import './Help.scss';

const Help = () => {
  return (
    <div className="help-container">
      <h1>Get Help</h1>

      <div className="contact-us">
        <h2>Contact Us</h2>
        <p>
          If you have any questions or need assistance, feel free to contact our support team.
          We're here to help!
        </p>

        <p>
          You can reach us through the following methods:
        </p>

        <ul>
          <li>
          <strong>ِAdmin email:</strong> <a href="mailto:mohamad4112002@gmail.com">mohamad4112002@gmail.com</a>
          </li>
          <li>
            <strong>Phone:</strong>+970598077631
          </li>
        </ul>
      </div>

      <div className="report-issue">
        <h2>Report an Issue</h2>
        <p>
          Encountered a problem or bug? Let us know by reporting the issue, and our team will
          work to resolve it promptly.
        </p>
      </div>

      <div className="q-and-a">
        <h2>Q&A</h2>
        <p>
          Check out our frequently asked questions <Link to='/QA'>from here</Link> to find answers to common queries. If you
          can't find what you're looking for, contact us for further assistance.
        </p>
      </div>
    </div>
  );
};

export default Help;
