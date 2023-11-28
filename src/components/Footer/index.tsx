import Spacer from "react-spacer";
import styles from "./style.module.scss";

export default function Footer(): JSX.Element {
  return (
    <footer className={`${styles.footer} pattern-cross-dots-lg`}>
      <Spacer grow={1} />
      <span className={styles.copyrightBlock}>&copy; 2023 Higa Production</span>
      <Spacer grow={1} />
    </footer>
  );
}
