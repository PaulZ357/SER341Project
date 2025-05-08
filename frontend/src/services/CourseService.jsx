import Axios from "axios";

export async function getCourses(user) {
  const courses = await Axios.get("http://localhost:4000/courses");
  return courses.data.filter((course) => { return user.courses.includes(course._id) });
}
