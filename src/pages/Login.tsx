import { useNavigate } from "react-router-dom";
import { HouseLine } from "phosphor-react";
import { useState } from "react";
import { loginUser } from "../services/api";
import logo from "./../assets/dollar-bag.png";

export function Login() {
  const navigate = useNavigate();

  const [email, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setError(null);
    try {
      const data = await loginUser(email, password);

      localStorage.setItem("token", data.token.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: data.id,
          fullName: data.fullName,
          email: data.email,
        })
      );

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      setError("Usuário ou senha incorretos");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen p-4">
      <div className="relative w-11/12 max-w-xl h-9/10 max-h-[45rem] p-8 flex justify-center items-center rounded-lg border-2 border-[#2E7D32] flex-col">
        <button
          className="absolute top-4 left-4 z-10 bg-none border-none p-0 flex items-center justify-center"
          onClick={() => navigate("/")}
        >
          <HouseLine size={24} color="#808080" weight="duotone" />
        </button>
        <img src={logo} alt="logo" className="mb-8 max-w-[80%] h-auto" />
        <div className="flex justify-center flex-col w-full max-w-[28rem]">
          <div className="flex flex-col gap-6">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setName(e.target.value)}
              className="border border-[#333333] rounded-xl h-14 p-4 w-full"
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-[#333333] rounded-xl h-14 p-4 w-full"
            />
          </div>
          {error && <p className="text-red-500 mt-2 text-sm ml-2">{error}</p>}
          <div className="flex justify-end mt-2">
            <button
              type="submit"
              onClick={() => navigate("/forgot-password")}
              className="text-[#2E7D32] text-xs underline bg-none cursor-pointer"
            >
              Esqueceu sua senha?
            </button>
          </div>
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              onClick={handleLogin}
              className="bg-[#2E7D32] text-white h-14 flex justify-center items-center gap-2 px-4 py-2 rounded-xl border-2 border-[#388E3C] cursor-pointer transition-all duration-200 ease-in-out hover:scale-105 hover:bg-[#388E3C] w-full max-w-[7.625rem]"
            >
              Entrar
            </button>
          </div>
        </div>
        <div className="border-t border-[#2E7D32] w-full max-w-[28rem] mt-6"></div>
        <div className="flex justify-center mt-6 w-full">
          <button
            type="submit"
            onClick={() => navigate("/register")}
            className="h-14 p-4 text-[#2E7D32] bg-transparent rounded-xl border-2 border-[#2E7D32] cursor-pointer transition-all duration-200 ease-in-out hover:scale-105 hover:bg-[#388E3C] hover:text-white w-full max-w-[15rem]"
          >
            Cadastre-se agora
          </button>
        </div>
      </div>
    </div>
  );
}
