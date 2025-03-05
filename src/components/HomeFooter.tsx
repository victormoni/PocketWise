import styles from './HomeFooter.module.css'
import { Link } from "react-router-dom";

export function HomeFooter() {
    return (
        <div className={styles.container}>
            <Link to="/about">Sobre</Link>
            <a href='https://www.linkedin.com/in/patrick-meirelles/' target='/blank'>Linkedin</a>
            <a href='https://wa.me/11953936819' target='/blank'>Fale Conosco</a>
            {/* <a href=''>Créditos</a>  Page turned off until i got some idea*/}
        </div>
    )
}