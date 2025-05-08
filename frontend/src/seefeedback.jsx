import React, { Component, useEffect } from 'react';
import { useLocation, Link } from "react-router-dom";
import App from './login';
import "./seefeedback.css"
import { use } from 'react';
import { getLessons } from './services/UserService';
import { getFeedbacks } from './services/LessonService';

function SeeFeedback() {

  const [questions, setQuestions] = React.useState([]);
  useEffect(() => {
    async function fetchData() {
      getLessons(user).then((lessons) => {
        const lesson = lessons[0];
        console.log(lesson);
        getFeedbacks(lesson).then((feedbacks) => {
          setQuestions(feedbacks);
        });
      });
    }
    fetchData();
  }, []);
  const user = JSON.parse(localStorage.getItem("user"));
  const checked = " class=\"checked\""
  function Star({ isFilled }) {
    if (isFilled) {
      return <p class="checked">&#9733;</p>
    }
    else {
      return <p>&#9733;</p>
    }
  }
  return (
    <div class="feedback-form">
      <div className="left-sidebar">
        <nav>
          {/* Common Home Button */}
          <Link
            to="/home" className="btn btn-secondary" >Home</Link>

          {/* Role-specific Buttons */}
          {user.type === "professor" ? (
            <>
              <a className="btn btn-secondary">Feedback Log</a>
              <a className="btn btn-secondary">Add Assignment</a>
            </>
          ) : (
            <Link to="/givefeedback" className="btn btn-secondary" >
              Give Feedback
            </Link>
          )}

          {/* Profile Button */}
          <Link
            to="/profile"
            className="btn btn-secondary"
          >
            Profile
          </Link>

          {/* Course Selection Button */}
          <Link to="/selectcourse" className="btn btn-secondary">
            Course Selection
          </Link>

          {/* Log Out Button */}
          <Link to="/" className="btn btn-secondary">
            Log Out
          </Link>
        </nav>
      </div>
      {console.log(questions)}
      {questions.map((question) => (
        <div class="rating-form"><h2>{question.description}</h2>
          <div class="rating">
            <Star isFilled={question.rating > 4} />
            <Star isFilled={question.rating > 3} />
            <Star isFilled={question.rating > 2} />
            <Star isFilled={question.rating > 1} />
            <p class="checked">&#9733;</p>
          </div>
        </div>))}
    </div>
  );
}

export default SeeFeedback;

