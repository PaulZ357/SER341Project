import Axios from "axios";
import { getCourse } from "./LessonService";

export async function getCourses(user) {
  const courses = await Axios.get("http://localhost:4000/courses");
  return courses.data.filter((course) => { return user.courses.includes(course._id) });
}

export async function getLessons(professor) {
  const lessons = await Axios.get("http://localhost:4000/lessons");
  return lessons.data.filter(async (lesson) => {
    const course = await getCourse(lesson);
    console.log(course);
    return await course.professor === professor._id
  });
}
