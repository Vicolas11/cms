import ViewModal from "@/components/Modals/ViewModal";
import { Params } from "@/interfaces/props.interface";
import { getAComplaint } from "@/data/complaint/getComplaints";
import { getUser } from "@/data/user/getUser";
import React from "react";

export default async function ComplaintModal({ params }: Params) {
  const { id } = params;
  const complaint = await getAComplaint(id);
  const user = await getUser();

  return (
    <div>
      <ViewModal
        userId={user?.userId}
        showModal={id}
        detail={complaint?.data}
      />
    </div>
  );
}
