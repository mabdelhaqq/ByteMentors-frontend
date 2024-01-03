import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AllStudents.scss';
import Spinner from '../../../assets/spinner/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ConfirmDialog } from 'primereact/confirmdialog';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import user from "../../../assets/images/user.png"

const AllStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingStudent, setDeletingStudent] = useState(null);
  const [displayDialog, setDisplayDialog] = useState(false);
  const [studentIdToDelete, setStudentIdToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:3001/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStudentClick = (studentId) => {
    navigate(`/home/personalstudentn/${studentId}`);
  };

  const confirmDelete = (studentId) => {
    setStudentIdToDelete(studentId);
    setDisplayDialog(true);
  };

  const handleDeleteClick = async () => {
    setDisplayDialog(false);
    setDeletingStudent(studentIdToDelete);

    try {
      const response = await axios.delete(`http://localhost:3001/student/${studentIdToDelete}`);
      if (response.data.success) {
        setStudents(students.filter(student => student._id !== studentIdToDelete));
      } else {
        console.error('Failed to delete student');
      }
    } catch (error) {
      console.error('Error deleting student', error);
    } finally {
      setDeletingStudent(null);
    }
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Container className="all-students-page">
          <div className="searchb">
            <FontAwesomeIcon icon={faSearch} className="icon-search" />
            <input
              placeholder="Search"
              className="input-search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Row>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <Col md={12} key={student._id}>
                  <div className="student-card" onClick={() => handleStudentClick(student._id)}>
                    <div className='img-stu col-2'>
                      <img src={student.profileImage || user} alt={student.name} />
                    </div>
                    <div className='name-stu col-6'>
                    <h6 className="student-name">{student.name}</h6>
                    </div>
                    <div className='delete-btn col-4'>
                    <Button
                      variant="danger"
                      onClick={(event) => {
                        event.stopPropagation();
                        confirmDelete(student._id);
                      }}
                      className="btn-delete"
                      disabled={deletingStudent === student._id}
                    >
                      {deletingStudent === student._id ? 'Deleting...' : 'Delete Account'}
                    </Button>
                    </div>
                  </div>
                </Col>
              ))
            ) : (
              <h2>There are no matching students</h2>
            )}
          </Row>
          <ConfirmDialog
            visible={displayDialog}
            onHide={() => setDisplayDialog(false)}
            message="Are you sure you want to delete this account?"
            header="Confirmation"
            icon="pi pi-exclamation-triangle"
            acceptLabel="Yes"
            rejectLabel="No"
            acceptClassName="p-button-danger"
            accept={handleDeleteClick}
          />
        </Container>
      )}
    </>
  );
};

export default AllStudents;