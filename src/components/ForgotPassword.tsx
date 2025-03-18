import styles from "./ForgotPassword.module.css";
import logo from "./../assets/dollar-bag.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { forgotPassword } from "../services/api";

export function ForgotPasswordComponent() {
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
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <img src={logo} alt="logo" />
        <h2>Recuperação de senha</h2>
        <p className={styles.description}>
          Insira o e-mail cadastrado para receber instruções de recuperação de
          senha.
        </p>
        <input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.inputEmail}
        />
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.buttons}>
          <button
            type="submit"
            className={styles.sendButton}
            onClick={handleSendResetPassword}
            disabled={isLoading}
          >
            {isLoading ? "Enviando..." : "Enviar"}
          </button>
          <button
            type="submit"
            className={styles.turnBackButton}
            onClick={() => navigate("/login")}
          >
            Voltar
          </button>
        </div>
        {notification && (
          <div
            className={`${styles.notification} ${
              notification.type === "success"
                ? styles.successNotification
                : styles.errorNotification
            }`}
          >
            {notification.message}
          </div>
        )}
      </div>
    </div>
  );
}
