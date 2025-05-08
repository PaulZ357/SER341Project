import React, { Component, useEffect } from "react";
import { use } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { getCourses } from "./services/CourseService";
import { getProfessor } from "./services/UserService";

// Helper functional component to handle navigation
const NavigateButton = ({ course, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const courseID = course.courseID;

  const handleClick = () => {
    // Example logic for logging in (if needed)
    if (setIsLoggedIn) setIsLoggedIn(true);

    // Navigate to the "/home" route and pass course details via state
    navigate("/home", { state: { course } });
  };

  return <button onClick={handleClick}>{courseID}</button>;
};

function TableBody() {
  // const { courses, setIsLoggedIn } = this.props; // Destructuring props
  const user = JSON.parse(localStorage.getItem("user"));
  const [courses, setCourses] = React.useState([]);
  const [professors, setProfessors] = React.useState([]);

  useEffect(() => {
    async function fetchCourses() {
      setCourses(await getCourses(user));
    }
    fetchCourses();
  }, []);

  useEffect(() => {
    async function fetchCourses() {
      let newProfessors = [];
      courses.map(async (course) => {
        const professor = await getProfessor(course);
        newProfessors.push(professor);
        setProfessors(newProfessors);
      });
    }
    fetchCourses();
  }, [courses]);

  return (
    <tbody>
      {courses.map((course, index) => (
        <tr key={index}>
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