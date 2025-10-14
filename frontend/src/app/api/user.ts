import axios from "axios";

const API_URL = "http://127.0.0.1:5000"; // tu backend local NestJS

type UserDataType = {
  name: string;
  lastname: string;
  email: string;
  password: string;
  phone: string;
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
