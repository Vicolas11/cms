import Image from "next/image";
import styles from "./resetpassword.module.scss";
import { Metadata } from "next";
import AuthLayout from "@/components/AuthLayout";
import { ResetForm } from "@/components/ResetForm";

export const metadata: Metadata = {
  title: "Reset Password",
};

export default function ResetPassword() {
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
          <ResetForm />
        </div>
      </div>
    </AuthLayout>
  );
}
