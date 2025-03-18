import styles from "./Login.module.css";
import logo from "./../assets/dollar-bag.png";
import { useNavigate } from "react-router-dom";
import { HouseLine } from "phosphor-react";
import { useState } from "react";
import { loginUser } from "../services/api";

export function LoginComponent() {
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
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <button className={styles.homeButton} onClick={() => navigate("/")}>
          <HouseLine size={24} color="#808080" weight="duotone" />
        </button>
        <img src={logo} alt="logo" />
        <div className={styles.loginInfo}>
          <div className={styles.loginForm}>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.forgotPassword}>
            <button
              type="submit"
              onClick={() => navigate("/forgot-password")}
            >
              Esqueceu sua senha?
            </button>
          </div>
          <div className={styles.loginButtonContainer}>
            <button
              type="submit"
              className={styles.loginButton}
              onClick={handleLogin}
            >
              Entrar
            </button>
          </div>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.registerButtonContainer}>
          <button
            type="submit"
            className={styles.registerButton}
            onClick={() => navigate("/register")}
          >
            Cadastre-se agora
          </button>
        </div>
      </div>
    </div>
  );
}
