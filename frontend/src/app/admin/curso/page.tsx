"use client";
import { useState } from "react";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { useSession } from "next-auth/react";

import Navbar from "@/app/components/Navbar";
import { CREATE_CURSO } from "@/app/api/api";
type Resource = {
  type: "video" | "slides" | "image" | "text" | "transcription";
  content: string;
};

type Lesson = {
  id: string;
  title: string;
  description: string;
  resources: Resource[];
};

type Module = {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
};
/* eslint-disable max-lines-per-function, complexity */
const CREATE_COURSE = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [isAddingModule, setIsAddingModule] = useState(false);
  const [newModule, setNewModule] = useState({ title: "", description: "" });
  const [editingModule, setEditingModule] = useState<string | null>(null);
  const { data: session } = useSession();
  const handleAddModule = async () => {
    if (newModule.title.trim()) {
      try {
        let token: string | undefined;
        if (session?.accessToken) {
          token = session.accessToken;
          //console.log(token + "maaaaaaaaaaaaatate");
        }
        if (!token) {
          alert("No se encontró el token de autenticación.");
          return;
        }

        const response = await CREATE_CURSO(
          token,
          newModule.title,
          newModule.description,
        );

        console.log("Curso creado correctamente:", response);

        const newCourse: Module = {
          id: response.id?.toString() || Date.now().toString(),
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
    if (confirm("¿Estás seguro de que deseas eliminar este tópico?")) {
      setModules(modules.filter((m) => m.id !== moduleId));
    }
  };

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
            <p className="text-sm text-muted-foreground mb-2">Total Tópicos</p>
            <p className="text-4xl font-bold text-foreground">1</p>
          </div>
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <p className="text-sm text-muted-foreground mb-2">
              Total Lecciones
            </p>
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
            className="bg-[#0098af] hover:bg-[#19a2b6] px-4 py-2 rounded-4xl text-white transition cursor-pointer"
            onClick={() => setIsAddingModule(true)}
          >
            Agregar Tópico
          </button>
        ) : (
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Nuevo Tópico
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Título
                </label>
                <input
                  className="w-full rounded-lg bg-[#f3f7f8] border py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#0099ae]"
                  placeholder="Ej: Introducción a Python"
                  value={newModule.title}
                  onChange={(e) =>
                    setNewModule({ ...newModule, title: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Descripción
                </label>
                <textarea
                  className="w-full rounded-lg bg-[#f3f7f8] border py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#0099ae]"
                  placeholder="Describe el tópico..."
                  rows={3}
                  value={newModule.description}
                  onChange={(e) =>
                    setNewModule({ ...newModule, description: e.target.value })
                  }
                />
              </div>
              <div className="flex gap-2">
                <button
                  className="bg-[#0098af] hover:bg-[#19a2b6] px-4 py-2 rounded-4xl text-white transition cursor-pointer"
                  onClick={handleAddModule}
                >
                  Guardar
                </button>
                <button onClick={() => setIsAddingModule(false)}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4 mx-10">
        {modules.map((module, moduleIndex) => (
          <div className="rounded-xl border bg-card shadow-sm" key={module.id}>
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      Tópico {moduleIndex + 1}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      # lecciones
                    </span>
                  </div>
                  {editingModule === module.id ? (
                    <div className="space-y-3">
                      <input
                        value={module.title}
                        onChange={(e) =>
                          setModules(
                            modules.map((m) =>
                              m.id === module.id
                                ? { ...m, title: e.target.value }
                                : m,
                            ),
                          )
                        }
                      />
                      <textarea
                        rows={2}
                        value={module.description}
                        onChange={(e) =>
                          setModules(
                            modules.map((m) =>
                              m.id === module.id
                                ? { ...m, description: e.target.value }
                                : m,
                            ),
                          )
                        }
                      />
                      <div className="flex gap-2">
                        <button
                          className="bg-primary hover:bg-primary/90 text-primary-foreground"
                          onClick={() => setEditingModule(null)}
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
                      <h3 className="text-xl font-bold text-foreground mb-1">
                        {module.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {module.description}
                      </p>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button className="text-primary hover:text-primary">
                    <FaEdit className="h-4 w-4" />
                  </button>
                  <button
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleDeleteModule(module.id)}
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
};
export default CREATE_COURSE;
