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
      setCourses(await getCourses(user));
    }
    fetchCourses();
  }, []);

  useEffect(() => {
    async function fetchProfessors() {
      let newProfessors = [];
      courses.map(async (course) => {
        const professor = await getProfessor(course);
        newProfessors.push(professor);
        setProfessors(newProfessors);
      });
    }
    fetchProfessors();
  }, [courses]);

  return (
    <tbody>
      {courses.map((course, index) => (
        <tr key={index}>
          <td>
            <NavigateButton course={course} />
          </td>
          <td>{course.courseName}</td>
          <td>{professors[index] ? `${professors[index].firstName} ${professors[index].lastName}` : "Loading..."}</td>
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;