import { CustomBtn } from "@/components/common/CustomBtn";
import Modal from "@/components/Modals/Modal";
import { useRouter } from "next/navigation";
import styles from "./questionmodal.module.scss";

const QuestionModal = () => {
  const router = useRouter();

  return (
    <Modal xtraStyle={styles.modal}>
      <div className={styles.container}>
        <p>Are you sure all the question and options are correct?</p>
        <div className={styles.btn_wrapper}>
          <CustomBtn
            name="Yes"
            xtraStyle={styles.btn}
            onClick={() =>
              router.replace("/features/question/?submit=true", {
                scroll: false,
              })
            }
          />
          <CustomBtn
            name="No"
            xtraStyle={styles.btn}
            onClick={() =>
              router.replace("/features/question", { scroll: false })
            }
          />
        </div>
      </div>
    </Modal>
  );
};

export default QuestionModal;
