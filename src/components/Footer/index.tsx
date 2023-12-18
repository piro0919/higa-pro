import Image from "next/image";
import Spacer from "react-spacer";
import styles from "./style.module.scss";

export default function Footer(): JSX.Element {
  return (
    <footer className={`${styles.footer} pattern-cross-dots-lg`}>
      <Spacer grow={1} />
      <div className={styles.footerInner}>
        <Image
          alt="Higa Production"
          height={320}
          quality={100}
          src="/logo.png"
          width={320}
        />
        <span className={styles.copyrightBlock}>
          &copy; 2023 Higa Production
        </span>
      </div>
      <Spacer grow={1} />
    </footer>
  );
}
