import './QandA.scss';

const QAndA = () => {
  return (
    <div className="q-and-a-container">
      <h1>Questions and Answers</h1>

      <div className="qa-item">
        <h2>How do I create an account on Byte Mentor?</h2>
        <p>
          To create an account on Byte Mentor, click on the "Register" button on the top right corner of the page.
          Fill in the required information, and you're good to go!
        </p>
      </div>

      <div className="qa-item">
        <h2>How can I find a suitable internship opportunity?</h2>
        <p>
        Finding internship opportunities is easy! Navigate to the "Opportunities" section, where you'll discover
        a variety of internship listings from different companies. Filter based on your preferences and apply
        directly through Byte Mentor.
        </p>
      </div>

      <div className="qa-item">
        <h2>What should I do if I encounter a technical issue?</h2>
        <p>
          If you encounter any technical issues, please visit the "Help" page to contact with our team.
          Our support team will assist you in resolving the issue promptly.
        </p>
      </div>

      <div className="qa-item">
        <h2>Can I change my personal information after creating an account?</h2>
        <p>
        To modify your personal information, you can click on the "Edit Profile" button located on your personal page.
        There, you can update your data such as email, phone number and academic information.
        In addition, you can change your password through the "Settings" section of your account.

        </p>
      </div>

      <div className="qa-item">
        <h2>What should I do if I do not find a training opportunity that suits my field?</h2>
        <p>
        If you do not find a training opportunity that suits your specialty,
        you can take advantage of the general training plans available in the "Training Plans" section on our website.
        These plans enable you to strengthen your skills in a specific field through self-study.
        Choose the plan that suits your interests and begin your journey in developing your skills.
        And enhance your opportunities in the labor market.

        </p>
      </div>
      
    </div>
  );
};

export default QAndA;
