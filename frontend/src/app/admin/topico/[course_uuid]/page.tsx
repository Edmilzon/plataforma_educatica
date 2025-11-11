"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  FaEdit,
  FaRegTrashAlt,
  FaChevronUp,
  FaChevronDown,
} from "react-icons/fa";
import { useSession } from "next-auth/react";

import Navbar from "@/app/components/Navbar";
import { CREATE_TOPIC, GET_TOPICS_BY_COURSE } from "@/app/api/apiAdmin";

type Topic = {
  uuid: string;
  name: string;
  orden: number;
};

type CreateTopicRequest = {
  name: string;
  orden: number;
  course_uuid: string;
};
/* eslint-disable max-lines-per-function, complexity */
const TOPIC = () => {
  const { course_uuid } = useParams(); // Obtiene el UUID del curso desde la URL
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newTopic, setNewTopic] = useState({ name: "", orden: "" });
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [token, setToken] = useState("");
  const { data: session } = useSession();
  const [expandedTopic, setExpandedTopic] = useState<string[]>(["1"]);
  useEffect(() => {
    if (session?.accessToken) {
      setToken(session.accessToken);
    }
  }, [session]);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        if (!session?.accessToken) {
          console.warn("No hay sesión activa o token no disponible.");
          return;
        }
        const data = await GET_TOPICS_BY_COURSE(
          session.accessToken,
          course_uuid as string,
        );
        console.log("Tópicos obtenidos:", data);
        setTopics(data);
      } catch (error) {
        console.error("Error al obtener los tópicos:", error);
      }
    };

    if (session && course_uuid) fetchTopics();
  }, [session, course_uuid]);

  const handleAddTopic = async () => {
    if (!newTopic.name.trim() || !newTopic.orden.trim()) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {
      let token: string | undefined;
      if (session?.accessToken) {
        token = session.accessToken;
      }
      if (!token) {
        alert("No se encontró el token de autenticación.");
        return;
      }

      const topicData: CreateTopicRequest = {
        name: newTopic.name,
        orden: parseInt(newTopic.orden, 10),
        course_uuid: course_uuid as string,
      };

      const response = await CREATE_TOPIC(token, topicData);
      console.log("Tópico creado correctamente:", response);

      const newItem: Topic = {
        uuid: response.uuid || Date.now().toString(),
        name: newTopic.name,
        orden: parseInt(newTopic.orden, 10),
      };

      setTopics((prev) => [...prev, newItem]);
      setNewTopic({ name: "", orden: "" });
      setIsAdding(false);
    } catch (error) {
      console.error("Error al crear el tópico:", error);
    }
  };

  const toggleLesson = (moduleId: string) => {
    setExpandedTopic((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId],
    );
  };
  return (
    <div>
      <Navbar />
      <div className="mx-10 my-4">
        <h1 className="font-bold text-3xl">Gestión de Tópicos</h1>
        <p className="text-[#737373]">
          Gestiona el contenido del tópico del curso
        </p>
      </div>

      {/* FORMULARIO*/}
      <div className="mx-10 my-4">
        {!isAdding ? (
          <button
            className="bg-[#0098af] hover:bg-[#19a2b6] px-4 py-2 rounded-4xl text-white transition cursor-pointer"
            onClick={() => setIsAdding(true)}
          >
            Agregar Tópico
          </button>
        ) : (
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              Nuevo Tópico
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Nombre del tópico
                </label>
                <input
                  className="w-full rounded-lg bg-[#f3f7f8] border py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#0099ae]"
                  placeholder="Ej: Introducción a React"
                  value={newTopic.name}
                  onChange={(e) =>
                    setNewTopic({ ...newTopic, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Orden</label>
                <input
                  className="w-full rounded-lg bg-[#f3f7f8] border py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#0099ae]"
                  placeholder="Ej: 1"
                  type="number"
                  value={newTopic.orden}
                  onChange={(e) =>
                    setNewTopic({ ...newTopic, orden: e.target.value })
                  }
                />
              </div>

              <div className="flex gap-2">
                <button
                  className="bg-[#0098af] hover:bg-[#19a2b6] px-4 py-2 rounded-4xl text-white transition cursor-pointer"
                  onClick={handleAddTopic}
                >
                  Guardar
                </button>
                <button onClick={() => setIsAdding(false)}>Cancelar</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/*LISRAR TOPICOS*/}
      <div className="space-y-4 mx-10 mb-10">
        {topics.length === 0 ? (
          <p className="text-gray-500">No hay tópicos creados aún.</p>
        ) : (
          topics.map((topic, index) => (
            <div
              className="rounded-xl border bg-white shadow-sm p-6 flex justify-between items-center"
              key={topic.uuid || index}
            >
              <div>
                <p className="text-sm text-gray-500 mb-1">
                  Tópico {topic.orden}
                </p>
                <h3 className="text-xl font-bold">{topic.name}</h3>
              </div>
              <div className="flex gap-2">
                <button className="text-primary hover:text-primary">
                  <FaEdit className="h-4 w-4" />
                </button>
                <button className="text-red-500 hover:text-red-700">
                  <FaRegTrashAlt className="h-4 w-4" />
                </button>
                <button onClick={() => toggleLesson(topic.uuid)}>
                  {expandedTopic.includes(topic.uuid) ? (
                    <FaChevronDown />
                  ) : (
                    <FaChevronUp />
                  )}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TOPIC;
