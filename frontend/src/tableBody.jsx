import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCourses } from "./services/UserService";
import { getProfessor } from "./services/CourseService";

const NavigateButton = ({ course }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.setItem("course", JSON.stringify(course));
    navigate("/home");
  };

  return <button onClick={handleClick}>{course.courseID}</button>;
};

function TableBody() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [courses, setCourses] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCourses() {
      setLoading(true);
      try {
        const fetchedCourses = await getCourses(user);
        setCourses(fetchedCourses);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError("Failed to load courses.");
        setLoading(false);
      }
    }
    fetchCourses();
  }, [user]);

  useEffect(() => {
    async function fetchProfessors() {
      try {
        const professorPromises = courses.map((course) => getProfessor(course));
        const fetchedProfessors = await Promise.all(professorPromises);
        setProfessors(fetchedProfessors);
      } catch (error) {
        console.error("Error fetching professors:", error);
        setError("Failed to load professor names.");
      }
    }
    if (courses.length > 0) {
      fetchProfessors();
    }
  }, [courses]);

  if (loading) {
    return <tbody><tr><td colSpan="3">Loading courses...</td></tr></tbody>;
  }

  if (error) {
    return <tbody><tr><td colSpan="3">{error}</td></tr></tbody>;
  }

  if (courses.length === 0) {
    return <tbody><tr><td colSpan="3">No courses found.</td></tr></tbody>;
  }

  return (
    <tbody>
      {courses.map((course, index) => (
        <tr key={course._id}>
          <td>
            <NavigateButton course={course} />
          </td>
          <td>{course.courseName}</td>
          <td>{professors[index] ? professors[index].name : "Loading..."}</td>
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;