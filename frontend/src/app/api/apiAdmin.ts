import axios from "axios";

const API_URL = "http://127.0.0.1:5000";

export const GET_USERS = async (token: string) => {
  const res = await fetch(`${API_URL}/user/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Error al obtener usuarios");
  return res.json();
};

export const UPDATE_ROLE = async (
  token: string,
  userId: string,
  roleName: string,
) => {
  try {
    const res = await fetch("http://127.0.0.1:5000/admin/role/update", {
      method: "POST",
      headers: {
        //eslint-disable-next-line @typescript-eslint/naming-convention
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId, roleName }),
    });

    if (!res.ok) throw new Error("Error al actualizar el rol");

    return await res.json();
  } catch (error) {
    console.error("Error en UPDATE_ROLE:", error);
    throw error;
  }
};

export const CREATE_CURSO = async (
  token: string,
  title: string,
  description: string,
) => {
  try {
    const res = await fetch(`${API_URL}/course`, {
      method: "POST",
      headers: {
        //eslint-disable-next-line @typescript-eslint/naming-convention
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description }),
    });

    if (!res.ok) throw new Error("Error al actualizar el rol");

    return await res.json();
  } catch (error) {
    console.error("Error en CREATE_CURSO:", error);
    throw error;
  }
};

export const GET_CURSOS = async (token: string) => {
  try {
    const res = await fetch("http://127.0.0.1:5000/course", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Error al obtener los cursos");
    return await res.json();
  } catch (error) {
    console.error("Error en GET_CURSOS:", error);
    throw error;
  }
};

export type CreateTopicRequest = {
  name: string;
  orden: number;
  course_uuid: string;
};

export const CREATE_TOPIC = async (token: string, data: CreateTopicRequest) => {
  const res = await fetch("http://127.0.0.1:5000/topic", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      //eslint-disable-next-line @typescript-eslint/naming-convention
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error al crear el tópico");
  return res.json();
};

export const GET_TOPICS_BY_COURSE = async (
  token: string,
  course_uuid: string,
) => {
  try {
    const response = await axios.get(`${API_URL}/topic/course/${course_uuid}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(
      "Error al obtener tópicos del curso:",
      error.response?.data || error.message,
    );
    throw error;
  }
};
