import { ComplaintLayoutProps } from "@/interfaces/props.interface";
import { UserProfile } from "@/interfaces/userData.interface";
import { getBubble } from "@/data/complaint/getComplaints";
import { getUserDTO } from "@/data/user/getUserDTO";
import { getToken } from "@/utils/token.util";
import { Navbar } from "@/components/Navbar";
import styles from "./styles.module.scss";
import { Toaster } from "react-hot-toast";
import { getUser } from "@/data/user/getUser";

export default async function ComplaintLayout({
  children,
}: ComplaintLayoutProps) {
  const token = getToken();
  const userRole = await getUser();
  const data = await getUserDTO();
  const userData = { ...data?.data, role: userRole?.role } as UserProfile;
  const bubble = await getBubble();

  return (
    <div className={styles.container}>
      <Navbar token={token} data={userData} bubble={bubble?.data || 0} />
      <div className={styles.content}>{children}</div>
      <Toaster />
    </div>
  );
}
