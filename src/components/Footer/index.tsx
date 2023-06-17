import { Archivo } from "next/font/google";
import styles from "./style.module.scss";

const archivo = Archivo({ subsets: ["latin"] });

export default function Footer(): JSX.Element {
  return (
    <footer className={`${styles.footer} ${archivo.className}`}>
      &copy; 2023 HIGApro
    </footer>
  );
}
