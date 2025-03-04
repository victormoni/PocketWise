import styles from "./Register.module.css";
import logo from "./../assets/dollar-bag.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../services/api";

export function RegisterComponent() {
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
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <img src={logo} alt="logo" />
        <div className={styles.registerInfo}>
          <div className={styles.registerForm}>
            <input
              type="text"
              placeholder="Nome Completo"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          </div>
        </div>

        {/* Exibir erro caso ocorra */}
        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.divider}></div>
        <div className={styles.registerButtonContainer}>
          <button
            type="submit"
            className={styles.registerButton}
            onClick={handleRegister}
            disabled={!isValidPassword || !passwordsMatch}
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
