import React, { Component, useEffect, useState } from 'react';
import App from './login';
import { Link } from "react-router-dom";
import "./givefeedback.css"
import Axios from 'axios';
import { use } from 'react';
import { getLessons } from './services/UserService';
import { getFeedbacks } from './services/LessonService';

function Feedback() {
  const [lessons, setLessons] = useState([]);
  const [errors, setErrors] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));
  const course = JSON.parse(localStorage.getItem("course"));

  useEffect(() => {
    async function fetchData() {
      getLessons(user).then((lessons) => {
        setLessons(lessons);
      });
    }
    fetchData();
  }, []);
  return (
    <div className="app-container">
      <div className="left-sidebar">
        <nav>
          <Link to="/home" className="btn btn-secondary">Home</Link>
          {user.type === "professor" ? (
            <>
              <Link to="/seefeedback" className="btn btn-secondary">Feedback Log</Link>
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
      {lessons.map((lesson, index) => {
        return (
        <div class="feedback-form">
          <div class="open-ended">
            {/* <label for={question.name}>{question.name}:</label> */}
            <textarea id={`description-${index}`} name={`description-${index}`}></textarea>
          </div>
          <form id={"rating" + index} class="rating-form"><h2>{index}</h2>
            <div class="rating">
              <input type="radio" id={"star5-" + index} name={`rating-${index}`} value="5" />
              <label for={"star5-" + index}>&#9733;</label>
              <input type="radio" id={"star4-" + index} name={`rating-${index}`} value="4" />
              <label for={"star4-" + index}>&#9733;</label>
              <input type="radio" id={"star3-" + index} name={`rating-${index}`} value="3" />
              <label for={"star3-" + index}>&#9733;</label>
              <input type="radio" id={"star2-" + index} name={`rating-${index}`} value="2" />
              <label for={"star2-" + index}>&#9733;</label>
              <input type="radio" id={"star1-" + index} name={`rating-${index}`} value="1" />
              <label for={"star1-" + index}>&#9733;</label>
            </div>
          </form>
          <button type="submit" class="submit" onClick={() => {
            console.log("Submit button clicked");
              // if (question.type === "rating") {
              let rating = document.querySelector(`input[name="rating-${index}"]:checked`).value;
              const feedback = {
                course: course._id,
                student: user._id,
                description: document.getElementById(`description-${index}`).value,
                rating: rating,
              }
              console.log(user.feedbacks);
              console.log(lesson.feedbacks);
              if (user.feedbacks.some((feedback) => lesson.feedbacks.includes(feedback))) {
                Axios.put(`http://localhost:4000/feedbacks/${user.feedbacks.find((feedback) => lesson.feedbacks.includes(feedback))}`, feedback);
              }
              else {
                Axios.post("http://localhost:4000/feedbacks", feedback).then((response) => {
                  Axios.put(`http://localhost:4000/users/${user._id}`, {
                    ...user,
                    feedbacks: [...user.feedbacks, response.data._id]
                  });
                  user.feedbacks.push(response.data._id);
                  localStorage.setItem("user", JSON.stringify(user));
                  Axios.put(`http://localhost:4000/lessons/${lesson._id}`, {
                    ...lesson,
                    feedbacks: [...lesson.feedbacks, response.data._id]
                  });
                  lesson.feedbacks.push(response.data._id);
                  localStorage.setItem("lesson", JSON.stringify(lesson));
                });
              }
          }}>Submit</button>
        </div>)})}
    </div>
  );
}

export default Feedback;