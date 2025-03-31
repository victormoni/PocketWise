import { useLocation, useNavigate } from "react-router-dom";
import logo from "./../assets/dollar-bag.png";
import { useState } from "react";
import { resetPassword } from "../services/api";

export function ResetPassword() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswordRules, setShowPasswordRules] = useState(false);
  const [showConfirmPasswordError, setShowConfirmPasswordError] =
    useState(false);

  const passwordRequirements = [
    { text: "Pelo menos 8 caracteres", regex: /.{8,}/ },
    { text: "Uma letra maiúscula", regex: /[A-Z]/ },
    { text: "Uma letra minúscula", regex: /[a-z]/ },
    { text: "Um número", regex: /[0-9]/ },
    { text: "Um caractere especial (!@#$%^&*)", regex: /[!@#$%^&*]/ },
  ];

  const isValidPassword = passwordRequirements.every((req) =>
    req.regex.test(password)
  );

  const passwordsMatch =
    password === confirmPassword && confirmPassword.length > 0;

  const handleResetPassword = async () => {
    setError(null);
    setNotification(null);

    if (!passwordsMatch) {
      setError("As senhas não coincidem!");
      return;
    }

    if (!isValidPassword) {
      setError("A senha não atende todos os requisitos.");
      return;
    }

    setIsLoading(true);

    try {
      await resetPassword(token!, password);
      setNotification({
        message: "Senha alterada com sucesso!",
        type: "success",
      });
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      console.log(error);
      setNotification({
        message: "Token Expirado. Faça uma nova solicitação",
        type: "error",
      });
    } finally {
      setIsLoading(false);

      setTimeout(() => setNotification(null), 5000);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="relative w-full max-w-md h-full p-8 flex flex-col justify-center items-center rounded-xl border-2 border-[#2E7D32]">
        <img src={logo} alt="logo" />
        <h2 className="text-2xl font-bold text-center">Redefinição de senha</h2>
        <p className="text-center mt-2 mb-6">
          Insira sua nova senha e confirme para concluir a redefinição.
        </p>
        <div className="flex flex-col gap-4 w-4/5">
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setShowPasswordRules(true)}
            onBlur={() => {
              if (password === "" || isValidPassword) {
                setShowPasswordRules(false);
              }
            }}
            className="border border-[#333333] rounded-lg h-14 px-4 w-full"
          />
          {showPasswordRules && !isValidPassword && (
            <ul className="mt-2 pl-4 text-sm text-[#F75A68]">
              {passwordRequirements.map((req, index) => {
                const isValid = req.regex.test(password);
                return (
                  <li
                    key={index}
                    className={
                      isValid ? "line-through text-[#2E7D32]" : "text-[#F75A68]"
                    }
                  >
                    {req.text}
                  </li>
                );
              })}
            </ul>
          )}
          <input
            type="password"
            placeholder="Confirme sua senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onFocus={() => setShowConfirmPasswordError(true)}
            onBlur={() => {
              if (passwordsMatch || confirmPassword === "") {
                setShowConfirmPasswordError(false);
              }
            }}
            className="border border-[#333333] rounded-lg h-14 px-4 w-full"
          />
          {showConfirmPasswordError && !passwordsMatch && (
            <p className="text-[#F75A68] mt-2 ml-2 text-sm">
              As senhas não coincidem!
            </p>
          )}
          {error && <p className="text-[#F75A68] mt-2 ml-2 text-sm">{error}</p>}
        </div>
        <div className="flex flex-col gap-4 w-3/5 mt-4">
          <button
            type="submit"
            onClick={handleResetPassword}
            disabled={isLoading}
            className="h-14 px-4 bg-[#2E7D32] cursor-pointer text-white rounded-lg border border-[#2E7D32] disabled:bg-[#4CAF50] disabled:cursor-not-allowed disabled:opacity-40 hover:bg-[#388E3C]transition duration-200 ease-in-out transform hover:scale-105"
          >
            {isLoading ? "Enviando..." : "Enviar"}
          </button>
          <button
            type="submit"
            onClick={() => navigate("/login")}
            className="h-14 px-4 bg-[#F75A68] cursor-pointer text-white rounded-lg border border-[#F75A68] hover:bg-[#FF7B87] transition duration-200 ease-in-out transform hover:scale-105"
          >
            Voltar
          </button>
        </div>
        {notification && (
          <div
            className={`fixed top-5 right-5 py-2 px-6 rounded-xl font-bold text-white shadow-md animate-fadeIn ${
              notification.type === "success" ? "bg-[#2E7D32]" : "bg-[#F75A68]"
            }`}
          >
            {notification.message}
          </div>
        )}
      </div>
    </div>
  );
}
