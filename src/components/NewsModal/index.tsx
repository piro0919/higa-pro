import parse from "html-react-parser";
import Modal from "react-modal";
import { InstanceProps } from "react-modal-promise";
import styles from "./style.module.scss";

export type NewsModalProps<Resolve, Reject = Resolve> = InstanceProps<
  Resolve,
  Reject
> & {
  content: string;
};

export default function NewsModal<Resolve, Reject = Resolve>({
  content,
  isOpen,
  onResolve,
}: NewsModalProps<Resolve, Reject>): JSX.Element {
  return (
    <Modal className={`${styles.modal} pattern-cross-dots-lg`} isOpen={isOpen}>
      {parse(content)}
      <div className={styles.buttonWrapper}>
        <button className={styles.button} onClick={(): void => onResolve()}>
          OK
        </button>
      </div>
    </Modal>
  );
}
