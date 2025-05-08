import Axios from "axios";

export async function getProfessor(course) {
  const users = await Axios.get("http://localhost:4000/users");
  const professor = users.data.find((user) => { return user._id === course.professor });
  return professor;
}
