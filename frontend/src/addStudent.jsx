import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import "./addStudent.css";
import "./login.css";

function AddStudent() {
  const user = JSON.parse(localStorage.getItem("user"));
  const course = JSON.parse(localStorage.getItem("course"));

  const [formData, setFormData] = useState({ firstName: "", lastName: "" });
  const [students, setStudents] = useState([]);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    async function fetchStudents() {
      try {
        const response = await Axios.get("http://localhost:4000/users");
        const courseStudents = response.data.filter(
          (student) =>
            student.courses.includes(course._id) && student.type === "student"
        );
        setStudents(courseStudents);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    }
    fetchStudents();
  }, [course._id]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      const updated = { ...prev };
      if (value.trim()) delete updated[name];
      return updated;
    });
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await Axios.get(`http://localhost:4000/users`);
      const studentObject = response.data.find(
        (u) =>
          u.type === "student" &&
          u.firstName.toLowerCase() === formData.firstName.toLowerCase() &&
          u.lastName.toLowerCase() === formData.lastName.toLowerCase()
      );

      if (!studentObject) {
        setErrors({ form: "Student not found." });
        return;
      }

      const studentId = studentObject._id;

      const courseResponse = await Axios.get(`http://localhost:4000/courses/${course._id}`);
      const updatedStudents = [...new Set([...courseResponse.data.students, studentId])];

      await Axios.put(`http://localhost:4000/courses/${course._id}`, {
        students: updatedStudents,
      });
      
      const updatedCourses = [...new Set([...studentObject.courses, course._id])];
      await Axios.put(`http://localhost:4000/users/${studentId}`, {
        courses: updatedCourses,
      });

      setStudents((prev) => [...prev, studentObject]);
      setFormData({ firstName: "", lastName: "" });
      setSuccessMessage("Student added successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error adding student:", error);
      setErrors({ form: "Error adding student. Please try again." + error.message});
    }
  };

  const handleDeleteStudent = async (studentId) => {
    try {
      const courseResponse = await Axios.get(`http://localhost:4000/courses/${course._id}`);
      const updatedStudents = courseResponse.data.students.filter((id) => id !== studentId);
      const studentResponse = await Axios.get(`http://localhost:4000/users/${studentId}`);

      await Axios.put(`http://localhost:4000/courses/${course._id}`, {
        students: updatedStudents,
      });
      
      const updatedCourses = studentResponse.data.courses.filter((id) => id !== course._id);
      await Axios.put(`http://localhost:4000/users/${studentId}`, {
        courses: updatedCourses,
      });


      setStudents((prev) => prev.filter((s) => s._id !== studentId));
      setSuccessMessage("Student removed successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error removing student:", error);
      setErrors({ form: "Error removing student. Please try again." + error.message});
    }
  };

  return (
    <div className="app-container">
      <div className="left-sidebar">
        <nav>
          {user.type === "professor" ? (
            <Link to="/addstudent" className="btn btn-secondary">Add Student</Link>
          ) : (
            <Link to="/givefeedback" className="btn btn-secondary">Give Feedback</Link>
          )}
          <Link to="/profile" className="btn btn-secondary">Profile</Link>
          <Link to="/selectcourse" className="btn btn-secondary">Course Selection</Link>
          <Link to="/" className="btn btn-secondary">Log Out</Link>
        </nav>
      </div>
      <div className="add-student-container">
        <h2>Add Student</h2>
        <form onSubmit={handleAddStudent}>
          <div>
            <input
              type="text"
              name="firstName"
              placeholder="Student First Name"
              value={formData.firstName}
              onChange={handleInputChange}
            />
            {errors.firstName && <p className="error-text">{errors.firstName}</p>}
          </div>
          <div>
            <input
              type="text"
              name="lastName"
              placeholder="Student Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
            />
            {errors.lastName && <p className="error-text">{errors.lastName}</p>}
          </div>
          {errors.form && <p className="error-text">{errors.form}</p>}
          {successMessage && <p className="success-text">{successMessage}</p>}
          <button type="submit">Add Student</button>
        </form>

        <h3>Your Students</h3>
        {students.length > 0 ? (
          <ul>
            {students.map((student) => (
              <li key={student._id}>
                {student.firstName} {student.lastName}
                <button
                  className="delete-button"
                  onClick={() => handleDeleteStudent(student._id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No students found.</p>
        )}
      </div>
    </div>
  );
}

export default AddStudent;
