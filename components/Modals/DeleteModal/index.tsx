"use client";
import { deleteComplaintAction } from "@/services/complaint/complaintActions";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import CustomButton from "../../common/CustomButton";
import CustomHeader from "../../common/CustomHeader";
import ModalLayout from "../../Modals/ModalLayout";
import styles from "./styles.module.scss";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";

interface Props {
  showModal: string | null;
  id: string;
}

export default function DeleteModal({ showModal, id }: Props) {
  const [state, action] = useFormState(deleteComplaintAction, { data: null });
  const [show, setShow] = useState(showModal);
  const pathname = usePathname();
  const path = pathname.split("/")[1];
  const router = useRouter();

  const handleNo = useCallback(() => {
    router.replace(`/${path}`, { scroll: false });
    setShow(null);
  }, [path, router]);

  useEffect(() => {
    if (state.data) {
      if (state.data.status) {
        toast.success(state.data.message);
        handleNo();
      } else {
        toast.error(state.data.message);
      }
    }
  }, [handleNo, router, state.data]);

  return (
    <ModalLayout title="Delete Complaint" showModal={show}>
      <div className={styles.container}>
        <CustomHeader
          text="Do you want to delete complaint?"
          xtraStyle={styles.subtitle}
        />
        <div className={styles.btnContainer}>
          <CustomButton title="No" dontShow onClick={handleNo} />
          <form action={action}>
            <input type="hidden" name="id" defaultValue={id} />
            <CustomButton isDeleteBtn title={"Yes"} />
          </form>
        </div>
      </div>
    </ModalLayout>
  );
}
