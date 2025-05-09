import Axios from "axios";
import { getCourse } from "./LessonService";

export async function getCourses(user) {
  try {
    // Fetch the user's document to get their courses array
    const userResponse = await Axios.get(`http://localhost:4000/users/${user._id}`);
    const userCourses = userResponse.data.courses || [];
    if (userCourses.length === 0) return [];

    // Fetch all courses and filter those in the user's courses array
    const coursesResponse = await Axios.get("http://localhost:4000/courses");
    const allCourses = coursesResponse.data;
    return allCourses.filter((course) => userCourses.includes(course._id));
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
}

export async function getLessons(professor) {
  const lessons = await Axios.get("http://localhost:4000/lessons");
  return lessons.data.filter(async (lesson) => {
    const course = await getCourse(lesson);
    console.log(course);
    return await course.professor === professor._id;
  });
}
