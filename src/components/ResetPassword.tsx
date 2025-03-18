import { useLocation, useNavigate } from "react-router-dom";
import styles from "./ResetPassword.module.css";
import logo from "./../assets/dollar-bag.png";
import { useState } from "react";
import { resetPassword } from "../services/api";

export function ResetPasswordComponent() {
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
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <img src={logo} alt="logo" />
        <h2>Recuperação de senha</h2>
        <p className={styles.description}>
          Insira o e-mail cadastrado para receber instruções de recuperação de
          senha.
        </p>
        <div className={styles.passwords}>
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
          />
          {showPasswordRules && !isValidPassword && (
            <ul className={styles.passwordRules}>
              {passwordRequirements.map((req, index) => {
                const isValid = req.regex.test(password);
                return (
                  <li
                    key={index}
                    className={isValid ? styles.validRule : styles.invalidRule}
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
          />
          {showConfirmPasswordError && !passwordsMatch && (
            <p className={styles.error}>As senhas não coincidem!</p>
          )}
          {error && <p className={styles.error}>{error}</p>}
        </div>
        <div className={styles.buttons}>
          <button
            type="submit"
            className={styles.sendButton}
            onClick={handleResetPassword}
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
