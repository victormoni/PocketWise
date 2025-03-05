import styles from "./HomeCards.module.css";

interface ICards {
  logo: string;
  title: string;
  content: string[];
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function HomeCards({ logo, title, content, isHovered, onMouseEnter, onMouseLeave }: ICards) {
  return (
    <div
      className={`${styles.card} ${isHovered ? styles.hover : ""}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <img src={logo} alt="logo" />
      <h3>{title}</h3>
      <div className={styles.content}>
        {content.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
    </div>
  );
}
