import React from "react";
import { PropagateLoader } from "react-spinners";
import styles from "./styles.module.scss";

export default function ShowLoader() {
  return (
    <div className={styles.loader}>
      <PropagateLoader color="#3E4095" size={10} />
    </div>
  );
}
