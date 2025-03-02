import styles from "./Login.module.css";
import logo from "./../assets/dollar-bag.png";
import { useNavigate } from "react-router-dom";
import { HouseLine } from "phosphor-react";

export function LoginComponent() {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <button className={styles.homeButton} onClick={() => navigate("/")}>
          <HouseLine size={24} color="#808080"/>
        </button>
        <img src={logo} alt="logo" />
        <div className={styles.loginInfo}>
          <div className={styles.loginForm}>
            <input type="text" placeholder="Nome" />
            <input type="password" placeholder="Senha" />
          </div>
          <a href="https://exemplo.com">Esqueceu sua senha?</a>
          <div className={styles.loginButtonContainer}>
            <button
              type="submit"
              className={styles.loginButton}
              onClick={() => console.log("OiOi")}
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
