import ComplaintLayout from "@/components/ComplaintLayout";
import { getUserDTO } from "@/data/user/getUserDTO";
import styles from "./account.module.scss";
import Account from "@/components/Account";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account",
};

export default async function AccountPage() {
  const userData = await getUserDTO();

  return (
    <ComplaintLayout>
      <div className={styles.container}>
        <Account userData={userData?.data} />
      </div>
    </ComplaintLayout>
  );
}
