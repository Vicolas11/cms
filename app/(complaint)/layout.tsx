import { ReactNode } from "react";
import styles from "./styles.module.scss";
import { Navbar } from "@/components/Navbar";

export default function ComplaintLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
