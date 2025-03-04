import styles from "./Home.module.css";
import logo from "./../assets/dollar-bag.png";
import profile from "./../assets/profile-icon.png";
import { useNavigate } from "react-router-dom";

export function HomeComponent() {
  const navigate = useNavigate();
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
          <h2>Budgetify</h2>
        </div>
        <div className={styles.login}>
          <button
            className={styles.homeButton}
            onClick={() => navigate("/login")}
          >
            <img src={profile} alt="profile" />
          </button>
        </div>
      </div>
      <main className={styles.content}>
        <h1>Content</h1>
      </main>
    </div>
  );
}
