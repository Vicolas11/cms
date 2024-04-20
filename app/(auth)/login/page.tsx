import Image from "next/image";
import styles from "./login.module.scss";
import { LoginForm } from "@/components/LoginForm";
import { Metadata } from "next";
import AuthLayout from "@/components/AuthLayout";

export const metadata: Metadata = {
  title: "Login",
};

export default function Login() {
  return (
    <AuthLayout>
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
    </AuthLayout>
  );
}
