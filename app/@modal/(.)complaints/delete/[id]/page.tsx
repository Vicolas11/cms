import DeleteModal from "@/components/Modals/DeleteModal";
import { Params } from "@/interfaces/props.interface";
import React from "react";

export default async function DeleteModalPage({ params }: Params) {
  const { id } = params;

  return (
    <div>
      <DeleteModal showModal={id} id={id} />
    </div>
  );
}
