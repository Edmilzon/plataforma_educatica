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

import COMMENT from "@/app/components/CommentSection";
import Navbar from "@/app/components/Navbar";
import { CREATE_TOPIC, GET_TOPICS_BY_COURSE } from "@/app/api/apiAdmin";
import LESSON from "@/app/components/Lesson";

type Topic = {
  uuid_topic: string;
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
  const { course_uuid } = useParams();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newTopic, setNewTopic] = useState({ name: "", orden: "" });
  const { data: session } = useSession();
  const [token, setToken] = useState("");
  const [openLessonModal, setOpenLessonModal] = useState(false);
  const [expandedTopic, setExpandedTopic] = useState<string[]>(["1"]);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);

  // Guardar token
  useEffect(() => {
    if (session?.accessToken) {
      setToken(session.accessToken);
    }
  }, [session]);

  // Traer tópicos
  useEffect(() => {
    const fetchTopics = async () => {
      if (!session?.accessToken) return;
      try {
        const data = await GET_TOPICS_BY_COURSE(
          session.accessToken,
          course_uuid as string,
        );
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

    if (!token) {
      alert("No se encontró el token de autenticación.");
      return;
    }

    try {
      const topicData: CreateTopicRequest = {
        name: newTopic.name,
        orden: parseInt(newTopic.orden, 10),
        course_uuid: course_uuid as string,
      };

      const response = await CREATE_TOPIC(token, topicData);
      const newItem: Topic = {
        uuid_topic: response.uuid || Date.now().toString(),
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

  const handleOpenLessonModal = (uuid: string) => {
    setSelectedTopicId(uuid); // Guardamos el ID del tópico
    setOpenLessonModal(true); // Abrimos el modal
  };

  return (
    <div>
      <Navbar />
      <div className="px-10">
        <div className="my-8">
          <h1 className="font-bold text-3xl">Gestión de Tópicos</h1>
          <p className="text-[#737373]">
            Gestiona el contenido del tópico del curso
          </p>
        </div>

        {/* FORMULARIO */}
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
                {" "}
                Nuevo Tópico
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    {" "}
                    Nombre del tópico{" "}
                  </label>
                  <input
                    className="w-full rounded-lg bg-[#f3f7f8] border py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#0099ae]"
                    placeholder="Ej: Introducción a Python"
                    value={newTopic.name}
                    onChange={(e) =>
                      setNewTopic({ ...newTopic, name: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Orden
                  </label>
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

        {/* LISTAR TOPICOS */}
        <div className="space-y-4">
          {topics.length === 0 ? (
            <p className="text-gray-500">No hay tópicos creados aún.</p>
          ) : (
            topics.map((topic, index) => (
              <div
                className="rounded-xl border bg-white shadow-sm"
                key={topic.uuid_topic || index}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <p className="text-sm text-gray-500 mb-1">
                          {" "}
                          Tópico {topic.orden}{" "}
                        </p>
                        <h3 className="text-xl font-bold">{topic.name}</h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <button className="text-primary hover:text-primary">
                        <FaEdit className="h-4 w-4" />
                      </button>
                      <button className="text-red-500 hover:text-red-700">
                        <FaRegTrashAlt className="h-4 w-4" />
                      </button>
                      <button onClick={() => toggleLesson(topic.uuid_topic)}>
                        {expandedTopic.includes(topic.uuid_topic) ? (
                          <FaChevronUp />
                        ) : (
                          <FaChevronDown />
                        )}
                      </button>
                    </div>
                  </div>

                  {expandedTopic.includes(topic.uuid_topic) && (
                    <div className=" bg-[#f9f9f9] mt-6 pt-6 rounded-b-xl items-center">
                      <COMMENT topic_uid={selectedTopicId} />
                      <button
                        className="flex w-full border-dashed items-center gap-2 text-[#0098af] hover:text-[#007d91] font-medium"
                        onClick={() => handleOpenLessonModal(topic.uuid_topic)}
                      >
                        <span className="text-lg">+</span> Agregar Lección
                      </button>

                      {/* listar lecciones */}
                      <div className="space-y-3"></div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {openLessonModal && selectedTopicId && (
          <LESSON
            topic_uid={selectedTopicId}
            onClose={() => setOpenLessonModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default TOPIC;
