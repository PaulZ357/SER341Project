const courses = [
    {
      id: 1,
      courseID: "MA 229",
      courseName: "Linear Algebra",
      professor: "Prof. A"
    },
    {
      id: 2,
      courseID: "SER 340",
      courseName: "Full Stack Development Pt.1",
      professor: "Prof. B"
    },
    {
      id: 3,
      courseID: "SER 350",
      courseName: "Project Management",
      professor: "Prof. C"
    },

  ];
  export function getCourses() {
    return courses;
  }
  
export function getCourse(id) {
    return courses.find((c) => c.id === id);
  }
  