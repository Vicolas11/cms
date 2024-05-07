import { getToken } from "@/utils/token.util";
import { Navbar } from "@/components/Navbar";
import styles from "./styles.module.scss";
import { Toaster } from "react-hot-toast";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const token = getToken();

  return (
    <div className={styles.container}>
      <Navbar token={token} />
      <div className={styles.content}>{children}</div>
      <Toaster />
      <div></div>
    </div>
  );
}
