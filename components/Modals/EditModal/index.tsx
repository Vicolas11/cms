"use client";
import { AComplaintResp } from "@/interfaces/action.interface";
import { GetFacultType } from "@/interfaces/generic.interface";
import { ReportForm } from "@/components/ReportForm";
import styles from "./styles.module.scss";
import ModalLayout from "../ModalLayout";
import { useEffect, useState } from "react";

interface Props {
  showModal: string | null;
  departments: GetFacultType;
  faculty: GetFacultType;
  studAffair: GetFacultType;
  editedData: AComplaintResp | undefined | null;
}

export default function EditModal({
  showModal,
  departments,
  faculty,
  studAffair,
  editedData,
}: Props) {
  const [show, setShow] = useState(showModal);

  return (
    <ModalLayout title={"Edit Complaint"} showModal={show}>
      <div className={styles.container}>
        <ReportForm
          isEdit
          department={departments}
          faculty={faculty}
          studAffair={studAffair}
          editedData={editedData}
          setShow={setShow}
        />
      </div>
    </ModalLayout>
  );
}
