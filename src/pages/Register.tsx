import logo from "./../assets/dollar-bag.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../services/api";

export function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showPasswordRules, setShowPasswordRules] = useState(false);
  const [showConfirmPasswordError, setShowConfirmPasswordError] = useState(false);

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

  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;

  const handleRegister = async () => {
    setError(null);

    if (!passwordsMatch) {
      setError("As senhas não coincidem!");
      return;
    }

    if (!isValidPassword) {
      setError("A senha não atende todos os requisitos.");
      return;
    }

    try {
      const data = await registerUser(fullName, email, password);
      console.log("Registro bem-sucedido:", data);

      navigate("/login");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Erro desconhecido ao registrar.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="w-full max-w-lg p-8 flex justify-center items-center rounded-xl border-2 border-opacity-30 border-[#2E7D32] flex-col">
        <img src={logo} alt="logo" className="flex justify-center mb-8 w-1/5 max-w-xs h-auto" />
        <div className="w-full max-w-4xl flex flex-col items-center">
          <div className="flex flex-col gap-6 w-full max-w-lg">
            <input
              type="text"
              placeholder="Nome Completo"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="border border-[#333333] rounded-xl h-14 p-4 w-full"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-[#333333] rounded-xl h-14 p-4 w-full"
            />
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
              className="border border-[#333333] rounded-xl h-14 p-4 w-full"
            />
            {showPasswordRules && !isValidPassword && (
              <ul className="mt-2 pl-4 text-sm text-[#F75A68]">
                {passwordRequirements.map((req, index) => {
                  const isValid = req.regex.test(password);
                  return (
                    <li key={index} className={isValid ? "line-through text-[#2E7D32]" : ""}>
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
              className="border border-[#333333] rounded-xl h-14 p-4 w-full"
            />
            {showConfirmPasswordError && !passwordsMatch && (
              <p className="text-[#F75A68] text-sm ml-2">As senhas não coincidem!</p>
            )}
          </div>
        </div>
        {error && <p className="text-[#F75A68] text-sm ml-2">{error}</p>}
        <div className="border border-[#2E7D32] w-full max-w-lg mt-8"></div>
        <div className="flex justify-center mt-8 w-full">
          <button
            type="submit"
            className="h-14 w-full text-white max-w-xs bg-[#2E7D32] rounded-xl border border-[#2E7D32] cursor-pointer transition-all transform hover:scale-105 hover:bg-[#388E3C] disabled:bg-[#4CAF50] disabled:cursor-not-allowed disabled:opacity-40"
            onClick={handleRegister}
            disabled={!isValidPassword || !passwordsMatch}
          >
            Registrar-se agora
          </button>
        </div>
        <div className="flex justify-center mt-8 w-full">
          <button
            type="submit"
            className="h-14 w-full text-white max-w-xs bg-[#F75A68] rounded-xl border border-[#F75A68] cursor-pointer transition-all transform hover:scale-105 hover:bg-[#FF7B87]"
            onClick={() => navigate("/login")}
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}
