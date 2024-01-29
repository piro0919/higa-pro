import styles from "./style.module.scss";

export type ProfileEditProps = {
  profile: string;
};

export default function ProfileEdit({
  profile,
}: ProfileEditProps): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>{profile}</div>
    </div>
  );
}
