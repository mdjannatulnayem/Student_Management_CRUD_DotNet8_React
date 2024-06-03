import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StudentForm({ onAdd, onEdit, studentToEdit, closeForm }) {
  const [name, setName] = useState('');
  const [classId, setClassId] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    if (studentToEdit) {
      setName(studentToEdit.name);
      setClassId(studentToEdit.classId);
      setDob(studentToEdit.dob);
      setGender(studentToEdit.gender);
    }
  }, [studentToEdit]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get('http://localhost:5222/classes');
        setClasses(response.data);
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };
    fetchClasses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const student = { name, classId, dob, gender };

    try {
      if (studentToEdit) {
        await axios.patch(`http://localhost:5222/students/${studentToEdit.id}`, student);
        onEdit({ ...studentToEdit, ...student });
      } else {
        const response = await axios.post('http://localhost:5222/students', student);
        onAdd(response.data); 
      }
      closeForm();
    } catch (error) {
      console.error('Error submitting student:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Class:</label>
        <select value={classId} onChange={(e) => setClassId(e.target.value)} required>
          <option value="">Select Class</option>
          {classes.map((cls) => (
            <option key={cls.id} value={cls.id}>
              {cls.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Date of Birth:</label>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Gender:</label>
        <input
          type="radio"
          name="gender"
          value="1"
          checked={gender === '1'}
          onChange={(e) => setGender(e.target.value)}
          required
        /> Male
        <input
          type="radio"
          name="gender"
          value="2"
          checked={gender === '2'}
          onChange={(e) => setGender(e.target.value)}
          required
        /> Female
        <input
          type="radio"
          name="gender"
          value="3"
          checked={gender === '3'}
          onChange={(e) => setGender(e.target.value)}
          required
        /> Other
      </div>
      <button type="submit">{studentToEdit ? 'Update Student' : 'Add Student'}</button>
      <button type="button" onClick={closeForm}>Cancel</button>
    </form>
  );
}

export default StudentForm;
