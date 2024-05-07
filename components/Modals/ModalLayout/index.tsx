import { AnimatePresence, motion } from "framer-motion";
import styles from "./styles.module.scss";
import { MdClose } from "react-icons/md";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { modalAnimate } from "@/data/localData/animation.data";

interface Props {
  showModal: string | null;
  children: ReactNode;
  xtraStyle?: string;
  title: string;
}

export default function ModalLayout({
  showModal,
  children,
  xtraStyle,
  title,
}: Props) {
  const router = useRouter();

  return (
    <AnimatePresence mode="wait" onExitComplete={() => router.back()}>
      {showModal && (
        <motion.div
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={modalAnimate}
            className={`${styles.modal} ${xtraStyle}`}
          >
            <span
              className={styles.closeBtn}
              onClick={() => router.back()}
            >
              <MdClose size={20} />
            </span>
            <h3 className={styles.title}>{title}</h3>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
