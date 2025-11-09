"use client";
import { useState, useEffect } from "react";

import Navbar from "@/app/components/Navbar";
import { CREATE_CURSO, GET_CURSOS } from "@/app/api/api";

type Course = {
  id: string;
  title: string;
  description: string;
};
/* eslint-disable max-lines-per-function, complexity, @typescript-eslint/no-explicit-any */
const CREATE_COURSE = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [newCourse, setNewCourse] = useState({ title: "", description: "" });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) {
          alert("No se encontró el token de autenticación.");
          return;
        }

        const data = await GET_CURSOS(token);
        console.log("Cursos obtenidos:", data);

        const mappedCourses = data.map((course: any) => ({
          id: course.uuid_course,
          title: course.title,
          description: course.description,
        }));

        setCourses(mappedCourses);
      } catch (error) {
        console.error("Error al obtener cursos:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleAddCourse = async () => {
    if (newCourse.title.trim() && newCourse.description.trim()) {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) {
          alert("No se encontró el token de autenticación.");
          return;
        }

        const response = await CREATE_CURSO(
          token,
          newCourse.title,
          newCourse.description,
        );

        console.log("Curso creado correctamente:", response);

        const createdCourse: Course = {
          id:
            response.uuid_course ||
            response.id?.toString() ||
            Date.now().toString(),
          title: newCourse.title,
          description: newCourse.description,
        };

        setCourses([...courses, createdCourse]);
        setNewCourse({ title: "", description: "" });
        setIsAddingCourse(false);
      } catch (error) {
        console.error("Error al crear el curso:", error);
        alert("Error al crear el curso. Ver consola para más detalles.");
      }
    } else {
      alert("Por favor completa todos los campos.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="mx-10 my-4">
        <h1 className="font-bold text-3xl">Gestiona versiones del curso </h1>
        <p className="text-[#737373]">
          {" "}
          Crea y gestiona las versiones de los cursos de la plataforma{" "}
        </p>
      </div>
      <div className="mx-10 my-4">
        {!isAddingCourse ? (
          <button
            className="bg-[#0098af] hover:bg-[#19a2b6] px-4 py-2 rounded-4xl text-white transition cursor-pointer"
            onClick={() => setIsAddingCourse(true)}
          >
            Crear Nuevo Curso
          </button>
        ) : (
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Nuevo Curso
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Título
                </label>
                <input
                  className="w-full rounded-lg bg-[#f3f7f8] border py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#0099ae]"
                  placeholder="Ej: Introducción a Python"
                  value={newCourse.title}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, title: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Descripción
                </label>
                <textarea
                  className="w-full rounded-lg bg-[#f3f7f8] border py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#0099ae]"
                  placeholder="Describe el curso..."
                  rows={3}
                  value={newCourse.description}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, description: e.target.value })
                  }
                />
              </div>
              <div className="flex gap-2">
                <button
                  className="bg-[#0098af] hover:bg-[#19a2b6] px-4 py-2 rounded-4xl text-white transition cursor-pointer"
                  onClick={handleAddCourse}
                >
                  Guardar
                </button>
                <button onClick={() => setIsAddingCourse(false)}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* MOSTRAR CURSOS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-10 mt-8">
        {courses.length === 0 ? (
          <p className="text-gray-500 text-center col-span-3">
            No hay cursos creados aún.
          </p>
        ) : (
          courses.map((course) => (
            <div
              className="rounded-xl border bg-white p-6 shadow-sm flex flex-col justify-between"
              key={course.id}
            >
              <div>
                <h2 className="font-bold text-xl mb-2">{course.title}</h2>
                <p className="text-[#737373] mb-4">{course.description}</p>
              </div>
              <div className="flex items-center justify-between border-t pt-3">
                <button className="bg-[#e8f7f9] text-[#0098af] text-sm px-3 py-1 rounded-md hover:bg-[#d2eff3] transition">
                  Agregar Topicos
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default CREATE_COURSE;
