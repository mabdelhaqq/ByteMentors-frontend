import React from 'react';
import './Learn.scss';

const Learn = () => {
  return (
    <div className="learn-container">
      <h1>Explore and Learn</h1>

      <div className="learning-resources">
        <h2>Learning Resources</h2>
        <p>
          Byte Mentor's provides a diverse range of learning resources to help you enhance your skills
          and stay updated with the latest trends in the world of technology. From tutorials and articles
          to video lectures, we've got you covered.
        </p>
      </div>

      <div className="skill-development">
        <h2>Skill Development</h2>
        <p>
          Elevate your skills with our carefully curated learning paths. Whether you are interested in
          programming, data science, cybersecurity, or other IT domains, we offer personalized roadmaps
          to guide you through your skill development journey.
        </p>
      </div>

      <div className="using-the-platform">
        <h2>Using the Platform</h2>
        <p>
          New to Byte Mentor's? Learn how to navigate the platform, create an account, and make the most of
          your learning experience. Explore features and get tips on optimizing your time on Byte Mentor's.
        </p>
      </div>

      <div className="community-engagement">
        <h2>Community Engagement</h2>
        <p>
          Connect with like-minded learners, share your experiences, and collaborate on projects. Our
          community forums provide a space for networking, knowledge sharing, and mutual support among
          Byte Mentor's users.
        </p>
      </div>
    </div>
  );
};

export default Learn;
