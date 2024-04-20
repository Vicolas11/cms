"use client";
import { ViewModalProps } from "@/interfaces/props.interface";
import CustomButton from "../../common/CustomButton";
import { useRouter } from "next/navigation";
import styles from "./styles.module.scss";
import ModalLayout from "../ModalLayout";
import { ChangeEvent, useState } from "react";

export default function ViewModal({ showModal, detail }: ViewModalProps) {
  const [value, setValue] = useState("");
  const router = useRouter();

  const handleOnChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(evt.target.value);
  };

  return (
    <ModalLayout title={"Details"} showModal={showModal}>
      <div className={styles.container}>
        {detail ? (
          <>
            <ul>
              {Object.keys(detail)
                .filter((key) => key !== "id" && key !== "isRead")
                .map((key, i) => (
                  <li key={i}>
                    <h2>{key}</h2>
                    <p>
                      {key === "replied"
                        ? detail[key]
                          ? "Replied"
                          : "Pending"
                        : key === "response"
                        ? detail[key] === ""
                          ? "None"
                          : detail[key]
                        : detail[key]}
                    </p>
                  </li>
                ))}
            </ul>
            {!detail["replied"] && (
              <textarea
                placeholder="Enter reply here..."
                value={value}
                onChange={handleOnChange}
              ></textarea>
            )}
          </>
        ) : (
          <h1 className={styles.notFound}>No Complaint Found!</h1>
        )}
        <div className={styles.btnContainer} onClick={() => router.back()}>
          <CustomButton title="Close" />
          {detail && !detail["replied"] && (
            <CustomButton title="Reply" disabled={value === ""} />
          )}
        </div>
      </div>
    </ModalLayout>
  );
}
