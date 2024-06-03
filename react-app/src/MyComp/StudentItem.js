import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StudentItem({ student, onEdit, onDelete, onView }) {
  const { id, name, gender, dob, classId, createdDate, modificationDate } = student;
  const [className, setClassName] = useState('');
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const fetchClassName = async () => {
      try {
        const response = await axios.get(`http://localhost:5222/classes`);
        const classes = response.data;
        const matchedClass = classes.find(cls => cls.id === classId);
        if (matchedClass) {
          setClassName(matchedClass.name);
        }
      } catch (error) {
        console.error('Error fetching class name:', error);
      }
    };
    fetchClassName();
  }, [classId]);

  const getGenderLabel = (gender) => {
    switch (gender) {
      case 1:
        return 'Male';
      case 2:
        return 'Female';
      case 3:
        return 'Other';
      default:
        return '';
    }
  };

  const handleDelete = () => {
    onDelete(id);
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails); 
  };

  return (
    <>
      <tr>
        <td>{name}</td>
        <td>{className}</td>
        <td>{new Date(dob).toLocaleDateString()}</td>
        <td>{getGenderLabel(gender)}</td>
        <td>
          <button onClick={onEdit}>Edit</button>
          <button onClick={toggleDetails}>{showDetails ? 'Hide Details' : 'Detail'}</button>
          <button onClick={handleDelete}>Delete</button>
        </td>
      </tr>
      {showDetails && (
        <tr>
          <td colSpan="5">
            <div>
              <p>ID: {id}</p>
              <p>Name: {name}</p>
              <p>Class: {className}</p>
              <p>Date of Birth: {new Date(dob).toLocaleDateString()}</p>
              <p>Gender: {getGenderLabel(gender)}</p>
              <p>Created Date: {new Date(createdDate).toLocaleString()}</p>
              <p>Modification Date: {new Date(modificationDate).toLocaleString()}</p>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export default StudentItem;
