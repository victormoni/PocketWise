import axios from "axios";

const API_URL = "http://localhost:3333";

interface LoginResponse {
  token: {
    type: string;
    name: string;
    token: string;
    abilities: string[];
    lastUsedAt: string | null;
    expiresAt: string;
  };
  id: number;
  fullName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export const registerUser = async (
  fullName: string,
  email: string,
  password: string
) => {
  try {
    const response = await axios.post(`${API_URL}/user/register`, {
      fullName,
      email,
      password,
    });

    return response.data;
  } catch (error: unknown) {
    console.log(error);
    throw new Error("Erro ao registrar usuário.");
  }
};

export const loginUser = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(`${API_URL}/user/login`, {
    email,
    password,
  });
  return response.data;
};

export const getUserData = async (token: string) => {
  try {
    const response = await axios.get(`${API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.log(error);

    throw new Error("Erro ao buscar dados do usuário.");
  }
};
