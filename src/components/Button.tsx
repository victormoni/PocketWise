import { PlusCircle } from "phosphor-react";
import styles from "./Button.module.css";

interface Button {
    text: string
}

export function Button({ text }: Button) {
  return (
    <button type="submit" className={styles.button}>
      <PlusCircle size={16} /> {text}
    </button>
  );
}
