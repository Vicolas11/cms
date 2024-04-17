import { CustomBtn } from "@/components/common/CustomBtn";
import styles from "./questiondetailmodal.module.scss";
import Modal from "@/components/Modals/Modal";
import { useRouter } from "next/navigation";
import { CustomInput } from "@/components/common/CustomInput";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { ImageFileType } from "@/interfaces";
import { MdClose } from "react-icons/md";

const QuestionDetailModal = () => {
  const [inputValue, setInputValue] = useState({
    title: "",
    subtitle: "",
    price: "",
  });
  const [imgFile, setImgFile] = useState<ImageFileType>({
    file: null,
    image: "",
  });
  const { image, file } = imgFile;
  const router = useRouter();

  const handleOnImgUpload = (evt: ChangeEvent<HTMLInputElement>) => {
    const { files } = evt.target;
    if (files) {
      const file = files[0];
      setImgFile({ file, image: URL.createObjectURL(files[0]) });
    }
  };

  const handleOnChange = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = evt.target;
    setInputValue((prev) => ({ ...prev, [name]: value }));
  };

  const resetImgUpload = () => {
    setImgFile({ file: null, image: "" });
  };

  return (
    <Modal xtraStyle={styles.modal}>
      <div className={styles.container}>
        <div className={styles.cover_img}>
          <div className={styles.overlay}></div>
          {file && (
            <span onClick={resetImgUpload}>
              <MdClose size={20} />
            </span>
          )}
          {!file && (
            <label htmlFor="upload">
              <h3>Click here to Upload Image</h3>
            </label>
          )}
          <Image
            className={styles.Image}
            src={file ? image : "/placeholder.png"}
            alt="placeholder"
            fill
          />
        </div>
        <input
          type="file"
          name="upload"
          id="upload"
          hidden
          onChange={handleOnImgUpload}
        />
        <CustomInput
          xtraStyle={styles.input}
          placeholder="Title"
          name="title"
          value={inputValue.title}
          onChange={handleOnChange}
        />
        <textarea
          placeholder="Subtitle"
          rows={3}
          name="subtitle"
          value={inputValue.subtitle}
          onChange={handleOnChange}
        ></textarea>
        <CustomInput
          xtraStyle={styles.input}
          type="number"
          placeholder="Price"
          name="price"
          value={inputValue.price}
          onChange={handleOnChange}
        />
        <div className={styles.btn_wrapper}>
          <CustomBtn
            name="Submit"
            xtraStyle={styles.btn}
            onClick={() => router.replace("/features/competition")}
          />
        </div>
      </div>
    </Modal>
  );
};

export default QuestionDetailModal;
