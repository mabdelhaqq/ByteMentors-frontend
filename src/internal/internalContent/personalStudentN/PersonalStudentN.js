import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './PersonalStudentN.scss';
import Spinner from '../../../assets/spinner/Spinner';

const PersonalStudentN = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:3001/student/${id}`);
        if (response.data.success) {
          setStudent(response.data.student);
        } else {
          console.error('Failed to fetch student details');
        }
      } catch (error) {
        console.error('Error fetching student details', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudentDetails();
  }, [id]);
  const downloadCV = () => {
    if (!student.cv) {
      console.error('No CV available for download');
      return;
    }
      const link = document.createElement('a');
    link.href = student.cv;
    link.download = "CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    };

  if (isLoading) {
    return <Spinner />;
  }

  if (!student) {
    return <div>Student not found.</div>;
  }

  return (
    <Container className="personal-student-page">
      <Row>
        <Col md={12}>
          <div className="image">
            {student.profileImage && (
              <img
                src={student.profileImage}
                alt="Profile"
                className="profile-image"
              />
            )}
            {student.cv && (
    <Button variant="link" onClick={downloadCV}>
      Download CV
    </Button>
  )}
          </div>
        </Col>
        <Col md={12} className='name-cv'>
          <div className="name col-6">
            <h2>{student.name}</h2>
          </div>
        </Col>
        {student.bio && (
          <Col md={12}>
            <div className="bio">
              <p>{student.bio}</p>
            </div>
          </Col>
        )}
        {student.preferredField && (
          <Col md={12}>
          <div className="preferred-fields col-12">
            <h6>Preferred Failed: {student.preferredField}</h6>
          </div>
          </Col>
          )}
          <Col md={12}>
          {student.graduate ? (
            <div className="graduation">
              <p>{`Graduated from ${student.university} in ${student.graduationYear}`}</p>
            </div>
        ):(<div className='graduation'><p>Not graduated yet</p></div>)}
          </Col>
        <Col md={12}>
          <div className="location-phone">
            <div className="location col-6">
              <p><b>Location: </b>{student.city}</p>
            </div>
            <div className="phone col-6">
              <p><b>Phone Number: </b>{student.phoneNumber}</p>
            </div>
          </div>
        </Col>
        <Col md={12}>
          <div className="email-gender">
            <div className="email col-6">
              <p><b>Email: </b>{student.email}</p>
            </div>
              <div className="gender col-6">
                <p><b>Gender: </b>{student.gender}</p>
              </div>
          </div>
        </Col>
        {((student.linkedin) || (student.github)) &&(
          <Col md={12}>
            <div className='linkedin-github'>
          {student.linkedin && (
            <div className="linkedin col-6">
              <p><b>Linkedin: </b><a href={student.linkedin} target="_blank" rel="noopener noreferrer">{student.linkedin}</a></p>
            </div>
          )}
          {student.github && (
            <div className="github col-6">
              <p><b>Github: </b><a href={student.github} target="_blank" rel="noopener noreferrer">{student.github}</a></p>
            </div>
          )}
          </div>
          </Col>
        )}
        {student.skills.length > 0 && (
          <Col md={12}>
            <div className="skills">
              <p><b>Skills: </b></p>
              <ul>
                {student.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default PersonalStudentN;