import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Axios from 'axios';
import "./seefeedback.css";

function SeeFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [lessonMap, setLessonMap] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));
  const course = JSON.parse(localStorage.getItem("course"));

  useEffect(() => {
    async function fetchData() {
      try {
        const feedbackRes = await Axios.get("http://localhost:4000/feedbacks");
        const courseFeedbacks = feedbackRes.data.filter(f => f.course === course._id);

        // Fetch unique lesson IDs
        const lessonIds = [...new Set(courseFeedbacks.map(f => f.lesson))];

        // Fetch all lesson details in parallel
        const lessonPromises = lessonIds.map(id =>
          Axios.get(`http://localhost:4000/lessons/${id}`).then(res => [id, res.data])
        );

        const lessonEntries = await Promise.all(lessonPromises);
        const lessonMap = Object.fromEntries(lessonEntries);

        setFeedbacks(courseFeedbacks);
        setLessonMap(lessonMap);
      } catch (err) {
        console.error("Error fetching feedbacks or lessons:", err);
      }
    }

    fetchData();
  }, [course._id]);

  function Star({ isFilled }) {
    return <p className={isFilled ? "checked" : ""}>★</p>;
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
        {feedbacks.map((feedback, index) => {
          const lessonName = lessonMap[feedback.lesson]?.name || "Unknown Lesson";
          return (
            <div className="rating-form" key={index}>
              <h2>{lessonName}</h2>
              <h4>{feedback.description}</h4>
              <div className="rating">
                <Star isFilled={feedback.rating >= 5} />
                <Star isFilled={feedback.rating >= 4} />
                <Star isFilled={feedback.rating >= 3} />
                <Star isFilled={feedback.rating >= 2} />
                <Star isFilled={feedback.rating >= 1} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SeeFeedback;