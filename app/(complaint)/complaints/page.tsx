import Complaints from "@/components/Complaints";
import styles from "./complaint.module.scss";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Complaint",
};

export default function ComplaintPage() {
  return (
    <div className={styles.container}>
      <Complaints />
    </div>
  );
}
