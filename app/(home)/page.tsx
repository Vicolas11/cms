import Image from "next/image";
import styles from "./home.module.scss";
import { LoginForm } from "@/components/LoginForm";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  return (
    <div className={styles.home}>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.imgContainer}>
            <Image src="/image.svg" alt="illustrator" fill />
          </div>
          <div className={styles.text}>
            <h1>Complaint Management System</h1>
            <p>A management system that handle complaints from students</p>
          </div>
        </div>
        <div className={styles.form}>
          <LoginForm />
        </div>
      </div>
      <div></div>
    </div>
  );
}
