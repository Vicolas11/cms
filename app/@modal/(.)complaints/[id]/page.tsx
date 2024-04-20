import { DetailType } from "@/interfaces/generic.interface";
import ViewModal from "@/components/Modals/ViewModal";
import { tableInfo } from "@/data/table.data";
import React from "react";

export default function ComplaintModal({ params }: { params: { id: string } }) {
  const { id } = params;
  const detail: DetailType | undefined = tableInfo.body.find(
    (itm) => itm.id === id
  );

  return (
    <div>
      <ViewModal showModal={id} detail={detail} />
    </div>
  );
}
