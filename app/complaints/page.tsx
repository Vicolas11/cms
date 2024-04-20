import Complaints from "@/components/Complaints";
import styles from "./complaint.module.scss";
import { Metadata } from "next";
import ComplaintLayout from "@/components/ComplaintLayout";

export const metadata: Metadata = {
  title: "Complaint",
};

export default function ComplaintPage() {
  return (
    <ComplaintLayout>
      <div className={styles.container}>
        <Complaints />
      </div>
    </ComplaintLayout>
  );
}
