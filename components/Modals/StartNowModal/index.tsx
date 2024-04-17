import { CustomBtn } from "@/components/common/CustomBtn";
import Modal from "@/components/Modals/Modal";
import { useRouter } from "next/navigation";
import styles from "./startnowmodal.module.scss";

const StartModal = () => {
  const router = useRouter();

  return (
    <Modal xtraStyle={styles.modal}>
      <div className={styles.container}>
        <h4>Quiz Instruction</h4>
        <p>
          You are about to take a practical quiz. Each question has time
          allocated to it. The faster and correctly you answer it, the more
          points you earned.
        </p>
        <div className={styles.btn_wrapper}>
          <CustomBtn
            name="Start Now"
            xtraStyle={styles.btn}
            onClick={() => router.replace("/features/quiz")}
          />
        </div>
      </div>
    </Modal>
  );
};

export default StartModal;
