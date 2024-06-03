import React from 'react';

function StudentDetails({ student, closeDetails }) {
  const { name, className, dob, gender } = student;

  return (
    <div>
      <h3>Student Details</h3>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Class:</strong> {className}</p>
      <p><strong>Date of Birth:</strong> {dob}</p>
      <p><strong>Gender:</strong> {gender}</p>
      <button onClick={closeDetails}>Close</button>
    </div>
  );
}

export default StudentDetails;
