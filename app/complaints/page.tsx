import { ReComplaintResp } from "@/interfaces/action.interface";
import { getComplaints } from "@/data/complaint/getComplaints";
import { SearchParams } from "@/interfaces/props.interface";
import ComplaintLayout from "@/components/ComplaintLayout";
import Complaints from "@/components/Complaints";
import { getUser } from "@/data/user/getUser";
import styles from "./complaint.module.scss";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Complaint",
};

export default async function ComplaintPage({ searchParams }: SearchParams) {
  const currentPage = Number(searchParams?.page) || 1;
  const perPage = Number(searchParams?.perPage) || 8;
  const complaint = await getComplaints({ currentPage, perPage });
  const complaints = {
    data: complaint?.data,
    totalCount: complaint?.totalCount || 0,
    error: complaint?.error,
  } as ReComplaintResp;
  const user = await getUser();
  const id = searchParams?.id;

  return (
    <ComplaintLayout>
      <div className={styles.container}>
        <Complaints
          currentPg={currentPage}
          perPage={perPage}
          complaints={complaints}
          userId={user?.userId as string}
        />
      </div>
    </ComplaintLayout>
  );
}
