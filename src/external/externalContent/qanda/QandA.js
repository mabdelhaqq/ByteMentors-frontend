import './QandA.scss';

const QAndA = () => {
  return (
    <div className="q-and-a-container">
      <h1>Questions and Answers</h1>

      <div className="qa-item">
        <h2>How do I create an account on Byte Mentor's?</h2>
        <p>
          To create an account on Byte Mentor's, click on the "Register" button on the top right corner of the page.
          Fill in the required information, and you're good to go!
        </p>
      </div>

      <div className="qa-item">
        <h2>How can I find a suitable internship opportunity?</h2>
        <p>
        Finding internship opportunities is easy! Navigate to the "Opportunities" section, where you'll discover
        a variety of internship listings from different companies. Filter based on your preferences and apply
        directly through Byte Mentor's.
        </p>
      </div>

      <div className="qa-item">
        <h2>What should I do if I encounter a technical issue?</h2>
        <p>
          If you encounter any technical issues, please visit the "Help" page to contact with our team.
          Our support team will assist you in resolving the issue promptly.
        </p>
      </div>
    </div>
  );
};

export default QAndA;
