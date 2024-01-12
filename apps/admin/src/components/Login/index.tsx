import { StytchLogin } from "@stytch/nextjs";
import styles from "./style.module.scss";
import stytchConfig from "@/lib/stytchConfig";

export default function Login(): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <StytchLogin
        config={stytchConfig}
        styles={{
          container: {
            width: "min(calc(100dvw - 12px * 2), 400px)",
          },
        }}
      />
    </div>
  );
}
