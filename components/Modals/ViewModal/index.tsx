"use client";
import { makeResponseAction } from "@/services/complaint/complaintActions";
import { getDept, getFaculty } from "@/utils/getDeptFaculty.util";
import { ViewModalProps } from "@/interfaces/props.interface";
import { ChangeEvent, useEffect, useState } from "react";
import { formatDate } from "@/utils/formatdate.util";
import CustomButton from "../../common/CustomButton";
import { useRouter } from "next/navigation";
import styles from "./styles.module.scss";
import ModalLayout from "../ModalLayout";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";

export default function ViewModal({
  showModal,
  detail,
  userId,
}: ViewModalProps) {
  const [state, action] = useFormState(makeResponseAction, { data: null });
  const [value, setValue] = useState("");
  const isLoginUser = detail?.complainerUserId === userId;
  const router = useRouter();

  const handleOnChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(evt.target.value);
  };

  useEffect(() => {
    if (state.data) {
      if (state.data.status) {
        toast.success(state.data.message);
        router.back();
      } else {
        toast.error(state.data.message);
      }
    }
  }, [router, state.data]);

  return (
    <ModalLayout title={"Details"} showModal={showModal}>
      <form action={action}>
        <div className={styles.container}>
          {detail ? (
            <>
              <ul>
                {Object.keys(detail)
                  .filter(
                    (key) =>
                      key !== "id" &&
                      key !== "hasOpened" &&
                      key !== "complainerUserId" &&
                      key !== "reportedToUserId" &&
                      key !== "responseId"
                  )
                  .map((key, i) => (
                    <li key={i}>
                      <h2>{key}</h2>
                      <p>
                        {key === "hasReplied"
                          ? detail[key]
                            ? "Replied"
                            : "Pending"
                          : key === "reportedTo"
                          ? `${detail[key].name} ${
                              detail[key].faculty
                                ? `- Dean College of ${getFaculty(
                                    detail[key].faculty
                                  )}`
                                : detail[key].department
                                ? `- HOD Department of ${getDept(
                                    detail[key].department
                                  )}`
                                : "- Student Affairs"
                            }`
                          : key === "complainer"
                          ? `${detail[key].name} ${
                              detail[key].matricNum
                                ? `- ${detail[key].matricNum} (${detail[key].department})`
                                : detail[key].faculty
                                ? `(${detail[key].faculty})`
                                : detail[key].department
                                ? `(${detail[key].department})`
                                : detail[key].role === "Student_Affairs"
                                ? "(Student Affairs)"
                                : ""
                            }`
                          : key === "response"
                          ? !detail[key]
                            ? "No response yet"
                            : detail[key].body
                          : key === "createdAt"
                          ? formatDate(detail[key])
                          : detail[key]}
                      </p>
                    </li>
                  ))}
              </ul>
              {!detail["hasReplied"] && !isLoginUser && (
                <>
                  <input
                    type="hidden"
                    name="id"
                    defaultValue={`${detail.id}`}
                  />
                  <textarea
                    placeholder="Enter reply here..."
                    name="body"
                    value={value}
                    onChange={handleOnChange}
                  ></textarea>
                </>
              )}
            </>
          ) : (
            <h1 className={styles.notFound}>No Complaint Found!</h1>
          )}
          <div className={styles.btnContainer}>
            <CustomButton
              title="Close"
              type="button"
              dontShow={false}
              onClick={() => router.back()}
            />
            {detail && !detail["hasReplied"] && !isLoginUser && (
              <CustomButton
                type="submit"
                title="Reply"
                disabled={value === ""}
              />
            )}
          </div>
        </div>
      </form>
    </ModalLayout>
  );
}
