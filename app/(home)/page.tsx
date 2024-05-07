import CustomButton from "@/components/common/CustomButton";
import { Navbar } from "@/components/Navbar";
import styles from "./home.module.scss";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className={styles.container}>
        <Navbar isHome />
        <div className={styles.content}>
          <div className={styles.title}>
            <h1>Complaint Management System</h1>
            <p>
              A web application management system that handle complaints from
              students
            </p>
            <Link href={"/login"}>
              <CustomButton title="Learn More" xtraStyle={styles.btn} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
