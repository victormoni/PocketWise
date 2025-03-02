import styles from "./Register.module.css";
import logo from "./../assets/dollar-bag.png";
import { useNavigate } from "react-router-dom";

export function RegisterComponent() {
  const navigate = useNavigate();
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <img src={logo} alt="logo" />
        <div className={styles.registerInfo}>
          <div className={styles.registerForm}>
            <input type="text" placeholder="Nome Completo" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Senha" />
            <input type="password" placeholder="Confirme sua senha" />
          </div>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.registerButtonContainer}>
          <button
            type="submit"
            className={styles.registerButton}
            onClick={() => console.log("OiOi")}
          >
            Registrar-se agora
          </button>
        </div>
        <div className={styles.turnToLoginPage}>
          <button
            type="submit"
            className={styles.turnBackButton}
            onClick={() => navigate("/login")}
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}
