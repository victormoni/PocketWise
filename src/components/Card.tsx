import styles from "./Card.module.css";

interface CardProps {
  title?: string;
  content: string | number;
  category?: 'income' | 'expense' | 'available';
}

export function Card({ title, content, category }: CardProps) {
  let categoryClass = category ? styles[category] : "";
  if (category === "available") {
    categoryClass =
      typeof content === "number" && content > 0
        ? styles["availableHigherThanZero"]
        : styles["availableUnderZero"];
  }

  let formatedContent: string = typeof content === "string" ? content : content.toString();
  if (!isNaN(Number(content))) {
    formatedContent = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Number(content));
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={`${styles.content} ${categoryClass}`}>
        {formatedContent}
      </div>
    </div>
  );
}
