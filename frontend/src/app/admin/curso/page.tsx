"use client";
import Navbar from "@/app/components/Navbar"
import { useState } from "react";

import { CiCirclePlus, CiSaveDown2 } from "react-icons/ci";
import { FaEdit, FaRegTrashAlt, FaChevronCircleDown, FaChevronCircleUp } from "react-icons/fa";

import { CREATE_CURSO } from "@/app/api/api";

type Resource = {
  type: "video" | "slides" | "image" | "text" | "transcription"
  content: string
}

type Lesson = {
  id: string
  title: string
  description: string
  resources: Resource[]
}

type Module = {
  id: string
  title: string
  description: string
  lessons: Lesson[]
}


const CREATE_COURSE = () => {
  const [modules, setModules] = useState<Module[]>([
    {
      id: "1",
      title: "holaaa",
      description: "asdadasd",
      lessons: [],
    },
  ])
  const [expandedModules, setExpandedModules] = useState<string[]>(["1"])
  const [expandedLessons, setExpandedLessons] = useState<string[]>([])
  const [isAddingModule, setIsAddingModule] = useState(false)
  const [newModule, setNewModule] = useState({ title: "", description: "" })
  const [editingModule, setEditingModule] = useState<string | null>(null)
  const [isAddingLesson, setIsAddingLesson] = useState<string | null>(null)
  const [newLesson, setNewLesson] = useState({ title: "", description: "" })
  const [editingLesson, setEditingLesson] = useState<string | null>(null)

  const totalModules = modules.length
  const totalLessons = modules.reduce((acc, module) => acc + module.lessons.length, 0)
  const totalResources = modules.reduce(
    (acc, module) => acc + module.lessons.reduce((lessonAcc, lesson) => lessonAcc + lesson.resources.length, 0),
    0,
  )

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => (prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]))
  }

  const toggleLesson = (lessonId: string) => {
    setExpandedLessons((prev) => (prev.includes(lessonId) ? prev.filter((id) => id !== lessonId) : [...prev, lessonId]))
  }
const handleAddModule = async () => {
  if (newModule.title.trim()) {
    try {
      const token = sessionStorage.getItem("token"); // asegúrate de tenerlo guardado al iniciar sesión
      if (!token) {
        alert("No se encontró el token de autenticación.");
        return;
      }

      // Llamar a la API Flask
      const response = await CREATE_CURSO(
        token,
        newModule.title,
        newModule.description
      );

      console.log("Curso creado correctamente:", response);

      // Si todo sale bien, actualizar el estado local
      const newCourse: Module = {
        id: response.id?.toString() || Date.now().toString(), // usa el id real si lo devuelve
        title: newModule.title,
        description: newModule.description,
        lessons: [],
      };

      setModules([...modules, newCourse]);
      setNewModule({ title: "", description: "" });
      setIsAddingModule(false);

    } catch (error) {
      console.error("Error al crear el curso:", error);
      alert("Error al crear el curso. Ver consola para más detalles.");
    }
  }
};


  const handleDeleteModule = (moduleId: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar este módulo?")) {
      setModules(modules.filter((m) => m.id !== moduleId))
    }
  }


  return (
    <div>
      <Navbar />
      <div className="mx-10 my-4">
        <h1 className="font-bold text-3xl">Gestión del curso</h1>
        <p className="text-[#737373]">
          Gestiona el contenido del curso de Python
        </p>
      </div>
      <div className="mx-10 my-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <p className="text-sm text-muted-foreground mb-2">Total Módulos</p>
          <p className="text-4xl font-bold text-foreground">1</p>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <p className="text-sm text-muted-foreground mb-2">Total Lecciones</p>
          <p className="text-4xl font-bold text-foreground">0</p>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <p className="text-sm text-muted-foreground mb-2">Total Recursos</p>
          <p className="text-4xl font-bold text-foreground">0</p>
        </div>
      </div>
      </div>

      <div className="mx-10 my-4">
        {!isAddingModule ? (
          <button
            onClick={() => setIsAddingModule(true)}
            className="bg-[#0098af] hover:bg-[#19a2b6] px-4 py-2 rounded-4xl text-white transition cursor-pointer"
          >
            Agregar Módulo
          </button>
        ) : (
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground mb-4">Nuevo Módulo</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Título</label>
                <input
                  value={newModule.title}
                  onChange={(e) => setNewModule({ ...newModule, title: e.target.value })}
                  placeholder="Ej: Introducción a Python"
                  className="w-full rounded-lg bg-[#f3f7f8] border py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#0099ae]"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Descripción</label>
                <textarea
                  value={newModule.description}
                  onChange={(e) => setNewModule({ ...newModule, description: e.target.value })}
                  placeholder="Describe el módulo..."
                  rows={3}
                  className="w-full rounded-lg bg-[#f3f7f8] border py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#0099ae]"
                />
              </div>
              <div className="flex gap-2">
                <button onClick={handleAddModule} className="bg-[#0098af] hover:bg-[#19a2b6] px-4 py-2 rounded-4xl text-white transition cursor-pointer">
                  Guardar
                </button>
                <button onClick={() => setIsAddingModule(false)} >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

       <div className="space-y-4 mx-10" >
        {modules.map((module, moduleIndex) => (
          <div key={module.id} className="rounded-xl border bg-card shadow-sm">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-medium text-muted-foreground">Módulo {moduleIndex + 1}</span>
                    <span className="text-sm text-muted-foreground"># lecciones</span>
                  </div>
                  {editingModule === module.id ? (
                    <div className="space-y-3">
                      <input
                        value={module.title}
                        onChange={(e) =>
                          setModules(modules.map((m) => (m.id === module.id ? { ...m, title: e.target.value } : m)))
                        }
                      />
                      <textarea
                        value={module.description}
                        onChange={(e) =>
                          setModules(
                            modules.map((m) => (m.id === module.id ? { ...m, description: e.target.value } : m)),
                          )
                        }
                        rows={2}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingModule(null)}
                          className="bg-primary hover:bg-primary/90 text-primary-foreground"
                        >
                          Guardar
                        </button>
                        <button onClick={() => setEditingModule(null)}>
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-xl font-bold text-foreground mb-1">{module.title}</h3>
                      <p className="text-muted-foreground">{module.description}</p>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => setEditingModule(module.id)}
                    className="text-primary hover:text-primary"
                  >
                    <FaEdit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteModule(module.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <FaRegTrashAlt className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
export default CREATE_COURSE;