import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import "./addLesson.css";
import "./login.css";

function AddLesson() {
  const user = JSON.parse(localStorage.getItem("user"));
  const course = JSON.parse(localStorage.getItem("course"));

  const [formData, setFormData] = useState({ name: "" });
  const [lessons, setLessons] = useState([]);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    async function fetchLessons() {
      try {
        const response = await Axios.get("http://localhost:4000/lessons");
        const courseLessons = response.data.filter(
          (lesson) => lesson.course === course._id
        );
        setLessons(courseLessons);
      } catch (error) {
        console.error("Error fetching Lessons:", error);
      }
    }
    fetchLessons();
  }, [course._id]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Lesson name is required";
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

  const handleAddLesson = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const lesson = {
        name: formData.name,
        feedbacks: [],
        course: course._id,
      };
      const lessonResponse = await Axios.post("http://localhost:4000/lessons", lesson);
      const newLesson = lessonResponse.data;

      // Update the course's Lessons array
      const courseResponse = await Axios.get(`http://localhost:4000/courses/${course._id}`);
      const updatedLessons = [...courseResponse.data.lessons, newLesson._id];
      await Axios.put(`http://localhost:4000/courses/${course._id}`, {
        lessons: updatedLessons,
      });

      // Update localStorage with updated user (optional depending on app structure)
      const updatedUser = { ...user };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setLessons((prev) => [...prev, newLesson]);
      setFormData({ name: "" });
      setSuccessMessage("Lesson added successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error adding lesson:", error);
      setErrors({ form: "Error adding lesson. Please try again." });
    }
  };

  const handleDeleteLesson = async (lessonId) => {
    try {
      await Axios.delete(`http://localhost:4000/lessons/${lessonId}`);

      // Update course to remove the deleted lesson ID
      const courseResponse = await Axios.get(`http://localhost:4000/courses/${course._id}`);
      const updatedLessons = courseResponse.data.lessons.filter((id) => id !== lessonId);
      await Axios.put(`http://localhost:4000/courses/${course._id}`, {
        lessons: updatedLessons,
      });

      setLessons((prev) => prev.filter((lesson) => lesson._id !== lessonId));
      setSuccessMessage("Lesson deleted successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error deleting lesson:", error);
      setErrors({ form: "Error deleting lesson. Please try again." });
    }
  };

  return (
    <div className="app-container">
      <div className="left-sidebar">
        <nav>
          {user.type === "professor" ? (
            <Link to="/addlesson" className="btn btn-secondary">Add Lesson</Link>
          ) : (
            <Link to="/givefeedback" className="btn btn-secondary">Give Feedback</Link>
          )}
          <Link to="/profile" className="btn btn-secondary">Profile</Link>
          <Link to="/selectcourse" className="btn btn-secondary">Course Selection</Link>
          <Link to="/" className="btn btn-secondary">Log Out</Link>
        </nav>
      </div>
      <div className="add-lesson-container">
        <h2>Add Lesson</h2>
        <form onSubmit={handleAddLesson}>
          <div>
            <input
              type="text"
              name="name"
              placeholder="Lesson Name (e.g., 'Developing Test Cases')"
              value={formData.name}
              onChange={handleInputChange}
            />
            {errors.name && <p className="error-text">{errors.name}</p>}
          </div>
          {errors.form && <p className="error-text">{errors.form}</p>}
          {successMessage && <p className="success-text">{successMessage}</p>}
          <button type="submit">Add Lesson</button>
        </form>

        <h3>Your Lessons</h3>
        {lessons.length > 0 ? (
          <ul>
            {lessons.map((lesson) => (
              <li key={lesson._id}>
                {lesson.name}
                <button
                  className="delete-button"
                  onClick={() => handleDeleteLesson(lesson._id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No lessons found.</p>
        )}
      </div>
    </div>
  );
}

export default AddLesson;
