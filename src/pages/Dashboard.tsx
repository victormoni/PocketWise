import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../services/api";

export function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ id: number; fullName: string; email: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    
    getUserData(token)
      .then((data) => setUser(data))
      .catch((err) => setError(err.message));
  }, [navigate]);

  if (error) return <p>Erro: {error}</p>;
  if (!user) return <p>Carregando...</p>;

  return (
    <div>
      <h1>Bem-vindo, {user.fullName}!</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}
