import CourseCard from "./CourseCard";

export default function CourseList() {
  const courses = [
    {
      title: "1. Introducción a Python",
      duration: "5 min",
      image: "/python1.jpg",
    },
    {
      title: "2. Variables y tipos de datos",
      duration: "7 min",
      image: "/python2.jpg",
    },
    {
      title: "3. Estructuras de control",
      duration: "9 min",
      image: "/python3.jpg",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {courses.map((course, i) => (
        <CourseCard key={i} {...course} />
      ))}
    </div>
  );
}
