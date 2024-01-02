import Image from "next/image";
import styles from "./style.module.scss";

export default function Footer(): JSX.Element {
  return (
    <footer className={`${styles.footer} pattern-cross-dots-lg`}>
      <Image
        alt="Higa Production"
        height={320}
        quality={100}
        src="/logo.png"
        width={320}
      />
      <div className={styles.copyrightBlock}>&copy; 2023 Higa Production</div>
    </footer>
  );
}
