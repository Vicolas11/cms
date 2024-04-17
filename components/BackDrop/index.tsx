import { ReactNode } from "react";
import styles from "./backdrop.module.scss";

const BackDrop = ({ children }: { children: ReactNode }) => {
  return <div className={styles.backdrop}>{children}</div>;
};

export default BackDrop;
