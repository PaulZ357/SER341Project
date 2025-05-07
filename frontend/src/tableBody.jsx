import React, { Component } from "react";
import { useNavigate,useLocation,Link } from "react-router-dom";

// Helper functional component to handle navigation
const NavigateButton = ({ course, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { role, firstName, lastName, email } = location.state || {
    role: "Unknown",
    firstName: " ",
    lastName: " ",
    email: " ",
  };
  const courseID = course.courseID;
  const courseName = course.courseName;
  const professor = course.professor;

  const handleClick = () => {
    // Example logic for logging in (if needed)
    if (setIsLoggedIn) setIsLoggedIn(true);

    // Navigate to the "/home" route and pass course details via state
    navigate("/home", { state: { role, email, firstName, lastName, courseID, courseName, professor } });
  };

  return <button onClick={handleClick}>{courseID}</button>;
};

class TableBody extends Component {
  render() {
    const { courses, setIsLoggedIn } = this.props; // Destructuring props

    return (
      <tbody>
        {courses.map((course, index) => (
          <tr key={index}>
            <td>
              {/* Use the helper functional component */}
              <NavigateButton course={course} setIsLoggedIn={setIsLoggedIn} />
            </td>
            <td>{course.courseName}</td>
            <td>{course.professor}</td>
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;