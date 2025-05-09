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
  ]
  const user = JSON.parse(localStorage.getItem("user"));
  const course = JSON.parse(localStorage.getItem("course"));
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
      <div className="feedback-form">
        {questions.filter((question) => { return question.type === "rating" }).map((question) => (
          <form id={"rating" + question.id} className="rating-form"><h2>{question.name}</h2>
            <div className="rating">
              <input type="radio" id={"star5-" + question.id} name={`rating-${question.id}`} value="5" />
              <label htmlFor={"star5-" + question.id}>★</label>
              <input type="radio" id={"star4-" + question.id} name={`rating-${question.id}`} value="4" />
              <label htmlFor={"star4-" + question.id}>★</label>
              <input type="radio" id={"star3-" + question.id} name={`rating-${question.id}`} value="3" />
              <label htmlFor={"star3-" + question.id}>★</label>
              <input type="radio" id={"star2-" + question.id} name={`rating-${question.id}`} value="2" />
              <label htmlFor={"star2-" + question.id}>★</label>
              <input type="radio" id={"star1-" + question.id} name={`rating-${question.id}`} value="1" />
              <label htmlFor={"star1-" + question.id}>★</label>
            </div>
          </form>))}
        <button type="submit" className="submit" onClick={() => {
          console.log("Submit button clicked");
          for (let question of questions) {
            let rating = document.querySelector(`input[name="rating-${question.id}"]:checked`).value;
            const feedback = Axios.post("http://localhost:4000/feedbacks", {
              course: course._id,
              student: user._id,
              description: question.name,
              rating: rating,
            });
          }
        }}>Submit</button>
      </div>
    </div>
  );
}

export default Feedback;