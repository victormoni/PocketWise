import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { forgotPassword } from "../services/api";
import logo from "./../assets/dollar-bag.png";

export function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const handleSendResetPassword = async () => {
    setError(null);
    setNotification(null);

    if (!email) {
      setError("Email não encontrado");
      return;
    }

    setIsLoading(true);

    try {
      await forgotPassword(email);
      setNotification({
        message: "Email de recuperação enviado com sucesso!",
        type: "success",
      });
    } catch (error) {
      console.log(error);

      setNotification({
        message: "Erro ao enviar o email. Tente novamente.",
        type: "error",
      });
    } finally {
      setIsLoading(false);

      setTimeout(() => setNotification(null), 5000);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen p-4">
      <div className="relative w-11/12 max-w-md h-11/12 max-h-[45rem] p-8 flex flex-col justify-center items-center rounded-lg border-2 border-[#2E7D32]">
        <img src={logo} alt="logo" className="mb-8 max-w-[80%] h-auto" />
        <h2 className="text-2xl font-bold mb-4">Recuperação de senha</h2>
        <p className="text-center mb-4">
          Insira o e-mail cadastrado para receber instruções de recuperação de
          senha.
        </p>
        <input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border border-[#333333] rounded-lg h-14 px-4 w-full mb-4"
        />
        {error && <p className="text-[#F75A68] text-sm mb-4">{error}</p>}
        <div className="gap-4 flex flex-col mb-4 w-3/5">
          <button
            type="submit"
            className="h-14 p-4 text-white bg-[#2E7D32] rounded-lg border-1 border-[#2E7D32] cursor-pointer transition-all duration-200 ease-in-out hover:scale-105 hover:bg-[#388E3C] disabled:bg-[#4CAF50] disabled:cursor-not-allowed disabled:opacity-40"
            onClick={handleSendResetPassword}
            disabled={isLoading}
          >
            {isLoading ? "Enviando..." : "Enviar"}
          </button>
          <button
            type="submit"
            className="h-14 p-4 text-white bg-[#F75A68] rounded-lg border-1 border-[#F75A68] cursor-pointer transition-all duration-200 ease-in-out hover:scale-105 hover:bg-[#FF7B87]"
            onClick={() => navigate("/login")}
          >
            Voltar
          </button>
        </div>
        {notification && (
          <div
            className={`fixed top-5 right-5 p-3 rounded-lg font-bold shadow-md transition-opacity duration-500 ${
              notification.type === "success"
                ? "bg-[#2E7D32] text-white"
                : "bg-[#F75A68] text-white"
            }`}
          >
            {notification.message}
          </div>
        )}
      </div>
    </div>
  );
}
