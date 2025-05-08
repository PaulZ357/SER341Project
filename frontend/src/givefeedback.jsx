import React, { Component } from 'react';
import App from './login';
import { Link } from "react-router-dom";
import "./givefeedback.css"
import Axios from 'axios';
import { getFeedbacks } from './services/FeedbackService';

function Feedback() {
  const questions = [
    { name: "How well did you understand the central concepts and ideas in this course?", type: "rating", id: 1 },
    { name: "How well could you apply information/skills learned in this course?", type: "rating", id: 2 },
    { name: "How much were your critical thinking and/or problem solving abilities enhanced during this course?", type: "rating", id: 3 },
    // { name: "What are major strengths and/or major areas of improvement for the professor?", type: "open", id: 4 },
    // { name: "What are major strengths and/or major areas of improvement for the course?", type: "open", id: 5 },
  ]
  const user = JSON.parse(localStorage.getItem("user"));
  const course = JSON.parse(localStorage.getItem("course"));
  return (
    <div className="app-container">
      <div className="left-sidebar">
        <nav>
          {/* Common Home Button */}
          <Link
            to="/home" className="btn btn-secondary">Home</Link>

          {/* Role-specific Buttons */}
          {user.type === "professor" ? (
            <>
              <a className="btn btn-secondary">Feedback Log</a>
              <a className="btn btn-secondary">Add Assignment</a>
            </>
          ) : (
            <Link to="/givefeedback" className="btn btn-secondary" >Give Feedback</Link>
          )}

          {/* Profile Button */}
          <Link to="/profile" className="btn btn-secondary">Profile</Link>

          {/* Course Selection Button */}
          <Link to="/selectcourse" className="btn btn-secondary">Course Selection</Link>

          {/* Log Out Button */}
          <Link to="/" className="btn btn-secondary">Log Out</Link>
        </nav>
      </div>
      <div class="feedback-form">
        {questions.filter((question) => { return question.type === "rating" }).map((question) => (
          <form id={"rating" + question.id} class="rating-form"><h2>{question.name}</h2>
            <div class="rating">
              <input type="radio" id={"star5-" + question.id} name={`rating-${question.id}`} value="5" />
              <label for={"star5-" + question.id}>&#9733;</label>
              <input type="radio" id={"star4-" + question.id} name={`rating-${question.id}`} value="4" />
              <label for={"star4-" + question.id}>&#9733;</label>
              <input type="radio" id={"star3-" + question.id} name={`rating-${question.id}`} value="3" />
              <label for={"star3-" + question.id}>&#9733;</label>
              <input type="radio" id={"star2-" + question.id} name={`rating-${question.id}`} value="2" />
              <label for={"star2-" + question.id}>&#9733;</label>
              <input type="radio" id={"star1-" + question.id} name={`rating-${question.id}`} value="1" />
              <label for={"star1-" + question.id}>&#9733;</label>
            </div>
          </form>))}
        {questions.filter((question) => { return question.type === "open" }).map((question) => (
          <div class="open-ended">
            <label for={question.name}>{question.name}:</label>
            <textarea id={question.name} name={question.name}></textarea>
          </div>))}
        <button type="submit" class="submit" onClick={() => {
          console.log("Submit button clicked");
          for (let question of questions) {
            // if (question.type === "rating") {
            let rating = document.querySelector(`input[name="rating-${question.id}"]:checked`).value;
            const feedback = Axios.post("http://localhost:4000/feedbacks", {
              course: course._id,
              student: user._id,
              description: question.name,
              rating: rating,
            });
          }
          // else if (question.type === "open") {
          //   var open = document.getElementById(question.name).value;
          //   answer = open;
          // }
        }}>Submit</button>
      </div>
    </div>
  );
}

export default Feedback;

