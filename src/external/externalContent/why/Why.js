import './Why.scss';

const Why = () => {
  return (
    <div className="why-container">
      <h1>Empowering Future Tech Leaders</h1>
      <p>Byte Mentor Mission</p>

      <div className="project-description">
        <h2>Overview:</h2>
        <p>
          Byte Mentor is an innovative educational platform that provides guidance and recommendations for IT college students.
          The platform assists students in choosing their career and training paths in the fields of information technology and computer science.
          It offers comprehensive support and helps in finding optimal training opportunities in various computer and technology domains.
        </p>
      </div>

      <div className="project-goals">
        <h2>Goals:</h2>
        <ul>
          <li>- Assist students in choosing the most suitable training field.</li>
          <li>- Guide students to companies and available training opportunities.</li>
          <li>- Provide educational resources to help develop their skills.</li>
          <li>- Connect local companies with students and graduates.</li>
        </ul>
      </div>

      <div className="project-services">
        <h2>Services:</h2>
        <ul>
          <li>- Guidance and recommendation for students in choosing suitable career and training paths.</li>
          <li>- Comprehensive database of companies and training opportunities.</li>
          <li>- Ability to build a strong personal profile.</li>
          <li>- Facilitate communication between companies and students.</li>
        </ul>
      </div>

      <div className="user-types">
        <h2>User Types:</h2>
        <ul>
          <li>- Current students</li>
          <li>- Graduates seeking training opportunities</li>
          <li>- Companies</li>
        </ul>
      </div>
    </div>
  );
};

export default Why;