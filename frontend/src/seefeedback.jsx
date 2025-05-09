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
  function Star({ isFilled }) {
    if (isFilled) {
      return <p className="checked">★</p>
    }
    else {
      return <p>★</p>
    }
  }
  return (
    <div className="app-container">
      <div className="left-sidebar">
        <nav>
          
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
        {questions.map((question) => (
          <div className="rating-form"><h2>{question.description}</h2>
            <div className="rating">
              <Star isFilled={question.rating > 4} />
              <Star isFilled={question.rating > 3} />
              <Star isFilled={question.rating > 2} />
              <Star isFilled={question.rating > 1} />
              <Star isFilled={question.rating > 0} />
            </div>
          </div>))}
      </div>
    </div>
  );
}

export default SeeFeedback;