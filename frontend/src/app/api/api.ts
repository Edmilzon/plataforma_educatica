import axios from "axios";

const API_URL = "http://127.0.0.1:5000"; // backend local NestJS

type UserDataType = {
  name: string;
  lastname: string;
  email: string;
  password: string;
};

type LoginDataType = {
  email: string;
  password: string;
};

type LoginResponseType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
  message: string;
  status: number;
  token: string;
  login: {
    uuid_user: number;
    email: string;
    name: string;
    lastname: string;
  };
};

const HANDLE_AXIOS_ERROR = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    throw new Error(error.response?.data?.message || "Error en la solicitud");
  }
  throw new Error("Error al registrar usuario");
};

export const REGISTER_USER = async (user_data: UserDataType) => {
  try {
    const response = await axios.post(`${API_URL}/user/register`, user_data);
    return response.data;
  } catch (error) {
    HANDLE_AXIOS_ERROR(error);
  }
};

// Nueva función: Login
export const LOGIN_USER = async (
  login_data: LoginDataType,
): Promise<LoginResponseType> => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, login_data);
    return response.data as LoginResponseType;
  } catch (error) {
    HANDLE_AXIOS_ERROR(error);
    return error as never;
  }
};

export const VALIDATE_EMAIL_USER = async (email_data: { email: string }) => {
  try {
    const response = await axios.post(
      `${API_URL}/user/validate-email`,
      email_data,
    );
    return response.data;
  } catch (error) {
    HANDLE_AXIOS_ERROR(error);
  }
};
export const LOGIN_GOOGLE_USER = async (email: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/google/signin`, {
      email,
    });
    return response.data;
  } catch (error) {
    HANDLE_AXIOS_ERROR(error);
  }
};

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
