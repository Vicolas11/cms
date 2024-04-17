import { CustomBtn } from "@/components/common/CustomBtn";
import CustomRadio from "@/components/CustomRadioBtn";
import Modal from "@/components/Modals/Modal";
import styles from "./whoareyou.module.scss";

type Prop = {
  onClick?: () => void;
};

const WhoAreYouModal = ({ onClick }: Prop) => {
  return (
    <Modal xtraStyle={styles.modal}>
      <div className={styles.container}>
        <h4>Who are you?</h4>
        <div>
          <CustomRadio title="Beginner" id="opt1" />
          <CustomRadio title="Intermediate" id="opt2" />
          <CustomRadio title="Expect" id="opt3" />
        </div>
        <div className={styles.btn_wrapper}>
          <CustomBtn
            name="Continue"
            xtraStyle={styles.continueBtn}
            onClick={onClick}
          />
        </div>
      </div>
    </Modal>
  );
};

export default WhoAreYouModal;
