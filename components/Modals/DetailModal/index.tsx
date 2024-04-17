import { CustomBtn } from "@/components/common/CustomBtn";
import Modal from "@/components/Modals/Modal";
import { useRouter } from "next/navigation";
import styles from "./detailmodal.module.scss";

const DetailModal = () => {
  const router = useRouter();

  return (
    <Modal xtraStyle={styles.modal}>
      <div className={styles.container}>
        <h4>Doughing Test Competition</h4>
        <div className={styles.scroll}>
          <div className={styles.img_cover}>
            <img src="/img.jpg" alt="image cover" />
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, animi
            culpa provident est consequatur natus. Delectus necessitatibus,
            cumque excepturi natus praesentium rerum reiciendis voluptates
            sapiente enim explicabo dolore ab ullam.
          </p>
        </div>
        <div className={styles.btn_wrapper}>
          <CustomBtn
            name="Continue"
            xtraStyle={styles.btn}
            onClick={() => router.replace("/features/competition/?start=true", { scroll: false })}
          />
        </div>
      </div>
    </Modal>
  );
};

export default DetailModal;
