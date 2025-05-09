import Axios from "axios";

export async function getProfessor(course) {
  const users = await Axios.get("http://localhost:4000/users");
  const professor = users.data.find((user) => user._id === course.professor);
  return professor;
}

export async function addCourse(course) {
  const response = await Axios.post("http://localhost:4000/courses", course);
  return response.data;
}

export async function deleteCourse(courseId) {
  const response = await Axios.delete(`http://localhost:4000/courses/${courseId}`);
  return response.data;
}

export async function getLessons(course) {
  const lessons = await Axios.get("http://localhost:4000/lessons");
  const filteredLessons = lessons.data.filter((lesson) => lesson.course === course._id);
  return filteredLessons;
}