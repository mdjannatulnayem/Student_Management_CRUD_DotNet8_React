import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentItem from './StudentItem';
import StudentForm from './StudentForm';
import StudentDetails from './StudentDetail';

function StudentList() {
  const [students, setStudents] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState(null);
  const [studentToView, setStudentToView] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:5222/students');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };
    fetchStudents();
  }, []);

  const addStudent = (student) => {
    setStudents(prevStudents => [...prevStudents, student]);
  };

  const editStudent = async (updatedStudent) => {
    try {
      const response = await axios.patch(`http://localhost:5222/students/${updatedStudent.id}`, updatedStudent);
      // Assuming the updated student data is returned from the server
      const updatedStudentData = response.data;
      const updatedStudents = students.map((student) =>
        student.id === updatedStudentData.id ? updatedStudentData : student
      );
      setStudents(updatedStudents);
      setStudentToEdit(null);
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };
  

  const deleteStudent = async (id) => {
    try {
      // Send DELETE request to backend
      await axios.delete(`http://localhost:5222/students/${id}`);
      
      // Update local state by filtering out the deleted student
      const updatedStudents = students.filter((student) => student.id !== id);
      setStudents(updatedStudents);
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const openFormToAdd = () => {
    setStudentToEdit(null);
    setIsFormOpen(true);
  };

  const openFormToEdit = (student) => {
    setStudentToEdit(student);
    setIsFormOpen(true);
  };

  const openDetails = (student) => {
    setStudentToView(student);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setStudentToEdit(null);
  };

  const closeDetails = () => {
    setStudentToView(null);
  };

  return (
    <div>
      <h2>Student Records</h2>
      <button onClick={openFormToAdd}>Add New Student</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Class</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <StudentItem
              key={student.id}
              student={student}
              onEdit={() => openFormToEdit(student)}
              onDelete={() => deleteStudent(student.id)}
              onView={() => openDetails(student)}
            />
          ))}
        </tbody>
      </table>
      {isFormOpen && (
        <StudentForm
          onAdd={addStudent}
          onEdit={editStudent}
          studentToEdit={studentToEdit}
          closeForm={closeForm}
        />
      )}
      {studentToView && (
        <StudentDetails
          student={studentToView}
          closeDetails={closeDetails}
        />
      )}
    </div>
  );
}

export default StudentList;
