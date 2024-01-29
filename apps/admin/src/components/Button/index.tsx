import { HTMLAttributes } from "react";
import styles from "./style.module.scss";

export type ButtonProps = Pick<
  HTMLAttributes<HTMLButtonElement>,
  "children" | "onClick"
> & {
  disabled?: boolean;
  type?: "button" | "submit";
};

export default function Button({
  children,
  disabled,
  onClick,
  type,
}: ButtonProps): JSX.Element {
  return (
    <button
      className={styles.button}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}
