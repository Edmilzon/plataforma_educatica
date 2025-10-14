import axios from "axios";

const API_URL = "http://127.0.0.1:5000"; // tu backend local NestJS

type UserDataType = {
  name: string;
  lastname: string;
  email: string;
  password: string;
  phone: string;
};

type LoginDataType = {
  email: string;
  password: string;
};

type LoginResponseType = {
  message: string;
  status: number;
  token: string;
  login: {
    uuid_user: number;
    email: string;
    name: string;
    lastname: string;
    phone: string;
    rol: string;
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

// 🔹 Nueva función: Login
export const LOGIN_USER = async (
  login_data: LoginDataType,
): Promise<LoginResponseType> => {
  try {
    const response = await axios.post(`${API_URL}/user/login`, login_data);
    return response.data as LoginResponseType;
  } catch (error) {
    HANDLE_AXIOS_ERROR(error);
    return error as never; // Añadido para evitar error de tipos
  }
};
