import Axios from "axios";

export async function getCourse(lesson) {
  const courses = await Axios.get("http://localhost:4000/courses");
  return courses.data.filter((course) => { return lesson.course === course._id });
}

export async function getFeedbacks(lesson) {
  const feedbacks = await Axios.get("http://localhost:4000/feedbacks");
  return feedbacks.data.filter((feedback) => { return lesson.feedbacks.includes(feedback._id) });
}