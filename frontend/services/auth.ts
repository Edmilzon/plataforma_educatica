import axios from "axios";

const API_URL = "http://127.0.0.1:5000";

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/user/login`, {
      email,
      password,
    });

    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || "Error en el login");
    } else {
      throw new Error("Error de conexión con el servidor");
    }
  }
};
