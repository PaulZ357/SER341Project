import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import "./addCourse.css";
import "./login.css";
import { getCourses } from "./services/UserService";

function AddCourse() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [formData, setFormData] = useState({
    courseID: "",
    sectionNumber: "",
    courseName: "",
  });
  const [courses, setCourses] = useState([]);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    async function fetchCourses() {
      try {
        setCourses(await getCourses(user));
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }
    fetchCourses();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.courseID.trim()) newErrors.courseID = "Course ID is required";
    if (!formData.sectionNumber.trim())
      newErrors.sectionNumber = "Section number is required";
    if (!formData.courseName.trim())
      newErrors.courseName = "Course name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const newErrors = { ...errors };
    if (value.trim()) delete newErrors[name];
    setErrors(newErrors);
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const course = {
        courseID: formData.courseID,
        sectionNumber: formData.sectionNumber,
        courseName: formData.courseName,
        professor: user._id,
        assignments: [],
        lessons: [],
        students: [],
      };
      const courseResponse = await Axios.post("http://localhost:4000/courses", course);
      const newCourse = courseResponse.data;

      // Update the professor's courses array
      const userResponse = await Axios.get(`http://localhost:4000/users/${user._id}`);
      const updatedCourses = [...userResponse.data.courses, newCourse._id];
      await Axios.put(`http://localhost:4000/users/${user._id}`, {
        courses: updatedCourses,
      });

      // Update localStorage to reflect the new courses array
      const updatedUser = { ...user, courses: updatedCourses };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setCourses([...courses, newCourse]);
      setFormData({ courseID: "", sectionNumber: "", courseName: "" });
      setSuccessMessage("Course added successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error adding course:", error);
      setErrors({ form: "Error adding course. Please try again." });
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      await Axios.delete(`http://localhost:4000/courses/${courseId}`);

      // Remove the course from the professor's courses array
      const userResponse = await Axios.get(`http://localhost:4000/users/${user._id}`);
      const updatedCourses = userResponse.data.courses.filter((id) => id !== courseId);
      await Axios.put(`http://localhost:4000/users/${user._id}`, {
        courses: updatedCourses,
      });

      // Update localStorage to reflect the updated courses array
      const updatedUser = { ...user, courses: updatedCourses };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setCourses(courses.filter((course) => course._id !== courseId));
      setSuccessMessage("Course deleted successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error deleting course:", error);
      setErrors({ form: "Error deleting course. Please try again." });
    }
  };

  return (
    <div className="app-container">
      <div className="left-sidebar">
        <nav>

          {user.type === "professor" ? (
            <>

              <Link to="/addcourse" className="btn btn-secondary">Add Course</Link>
            </>
          ) : (
            <Link to="/givefeedback" className="btn btn-secondary">Give Feedback</Link>
          )}
          <Link to="/profile" className="btn btn-secondary">Profile</Link>
          <Link to="/selectcourse" className="btn btn-secondary">Course Selection</Link>
          <Link to="/" className="btn btn-secondary">Log Out</Link>
        </nav>
      </div>
      <div className="add-course-container">
        <h2>Add Course</h2>
        <form onSubmit={handleAddCourse}>
          <div>
            <input
              type="text"
              name="courseID"
              placeholder="Course ID (e.g., SER341)"
              value={formData.courseID}
              onChange={handleInputChange}
            />
            {errors.courseID && <p className="error-text">{errors.courseID}</p>}
          </div>
          <div>
            <input
              type="text"
              name="sectionNumber"
              placeholder="Section Number (e.g., 01)"
              value={formData.sectionNumber}
              onChange={handleInputChange}
            />
            {errors.sectionNumber && (
              <p className="error-text">{errors.sectionNumber}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              name="courseName"
              placeholder="Course Name (e.g., Software Engineering)"
              value={formData.courseName}
              onChange={handleInputChange}
            />
            {errors.courseName && <p className="error-text">{errors.courseName}</p>}
          </div>
          {errors.form && <p className="error-text">{errors.form}</p>}
          {successMessage && <p className="success-text">{successMessage}</p>}
          <button type="submit">Add Course</button>
        </form>
        <h3>Your Courses</h3>
        {courses.length > 0 ? (
          <ul>
            {courses.map((course) => (
              <li key={course._id}>
                {course.courseID} - {course.courseName} (Section {course.sectionNumber})
                <button
                  className="delete-button"
                  onClick={() => handleDeleteCourse(course._id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No courses found.</p>
        )}
      </div>
    </div>
  );
}

export default AddCourse;