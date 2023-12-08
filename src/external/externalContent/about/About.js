import './About.scss';

const About = () => {
  return (
    <div className="about-container">
      <h1>About Byte Mentor</h1>
      
      <div className="company-info">
        <h2>Our Story</h2>
        <p>
          Byte Mentor's was founded in 2023 by computer science students, Mohamad Abdelhaq and Abdullah Yahya,
          as their graduation project at An-Najah National University. The inspiration came from observing the
          challenges students face in navigating the diverse field of computer science and technology.
        </p>
      </div>

      <div className="vision-mission">
        <h2>Vision & Mission</h2>
        <p>
          <strong>Vision:</strong> To unite and guide IT students towards successful career paths by providing
          personalized training recommendations and fostering connections with leading tech companies.
        </p>
        <p>
          <strong>Mission:</strong> Byte Mentor's is dedicated to offering comprehensive guidance, valuable resources,
          and a platform for students and companies to collaborate and grow together.
        </p>
      </div>

      <div className="our-team">
        <h2>Our Team</h2>
        <p>
          Meet the visionary founders, Mohamad and Abdullah, along with the passionate team that strives to make
          Byte Mentor's a catalyst for the success of future tech leaders.
        </p>
      </div>
    </div>
  );
};

export default About;
