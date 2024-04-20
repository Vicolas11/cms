import Image from "next/image";
import styles from "./register.module.scss";
import { RegisterForm } from "@/components/RegisterForm";
import { Metadata } from "next";
import AuthLayout from "@/components/AuthLayout";

export const metadata: Metadata = {
  title: "Register",
};

export default function Register() {
  return (
    <AuthLayout>
      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.imgContainer}>
            <Image
              src="/image.svg"
              alt="illustrator"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
          <div className={styles.text}>
            <h1>Complaint Management System</h1>
            <p>A management system that handle complaints from students</p>
          </div>
        </div>
        <div className={styles.form}>
          <RegisterForm />
        </div>
      </div>
    </AuthLayout>
  );
}
