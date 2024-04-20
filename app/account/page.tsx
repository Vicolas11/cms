import styles from "./account.module.scss";
import Account from "@/components/Account";
import ComplaintLayout from "@/components/ComplaintLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account",
};

export default function AccountPage() {
  return (
    <ComplaintLayout>
      <div className={styles.container}>
        <Account />
      </div>
    </ComplaintLayout>
  );
}
