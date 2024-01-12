import { HTMLAttributes } from "react";
import styles from "./style.module.scss";

export type ButtonProps = Pick<
  HTMLAttributes<HTMLButtonElement>,
  "children" | "onClick"
>;

export default function Button({
  children,
  onClick,
}: ButtonProps): JSX.Element {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
}
