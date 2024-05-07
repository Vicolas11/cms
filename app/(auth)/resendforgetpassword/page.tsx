import { ResendForgetForm } from "@/components/ResendForgetForm";
import styles from "./forgetpassword.module.scss";
import AuthLayout from "@/components/AuthLayout";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Resend Forget Password",
};

export default function ResendForgetPassword() {
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
          <ResendForgetForm />
        </div>
      </div>
    </AuthLayout>
  );
}
