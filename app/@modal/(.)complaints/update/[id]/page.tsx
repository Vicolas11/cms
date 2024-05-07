import EditModal from "@/components/Modals/EditModal";
import { Params } from "@/interfaces/props.interface";
import { getAComplaint } from "@/data/complaint/getComplaints";
import { getFacultDepart } from "@/data/user/getFacultDept";
import React from "react";

export default async function EditModalPage({ params }: Params) {
  const departments = await getFacultDepart({ role: "HOD" });
  const faculties = await getFacultDepart({ role: "Dean" });
  const studAffair = await getFacultDepart({ role: "Student_Affairs" });
  const { id } = params;
  const compliment = await getAComplaint(id);

  return (
    <div>
      <EditModal
        showModal={id}
        departments={departments?.data}
        faculty={faculties?.data}
        studAffair={studAffair?.data}
        editedData={compliment?.data}
      />
    </div>
  );
}
