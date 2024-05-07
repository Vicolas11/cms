"use client";
import {
  makeComplaintAction,
  updateComplaintAction,
} from "@/services/complaint/complaintActions";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { selectReportArrFunc } from "@/data/localData/selectopts.data";
import { IOpt, ReportFormProps } from "@/interfaces/props.interface";
import { SelectEditOptType } from "@/interfaces/generic.interface";
import { getDept, getFaculty } from "@/utils/getDeptFaculty.util";
import { Role } from "@/interfaces/userData.interface";
import { CustomInput } from "../common/CustomInput";
import CustomButton from "../common/CustomButton";
import { userOpt } from "@/utils/userRole.util";
import { useRouter } from "next/navigation";
import CustomSelect from "../CustomSelect";
import { useFormState } from "react-dom";
import styles from "./form.module.scss";
import toast from "react-hot-toast";

export const ReportForm = ({
  faculty,
  department,
  studAffair,
  isEdit = false,
  editedData,
  setShow,
}: ReportFormProps) => {
  const [state, action] = useFormState(
    isEdit ? updateComplaintAction : makeComplaintAction,
    { data: null }
  );

  const [selectedOpt, setSelectedOpt] = useState<SelectEditOptType>({
    user: isEdit ? userOpt(editedData?.reportedTo.role as Role) : null,
    dept: isEdit
      ? {
          value: editedData?.reportedTo.id,
          label: getDept(editedData?.reportedTo.department as string),
        }
      : null,
    facult: isEdit
      ? {
          value: editedData?.reportedTo.id,
          label: getFaculty(editedData?.reportedTo.faculty as string),
        }
      : null,
  });
  const [inputValue, setInputValue] = useState({
    subject: isEdit ? editedData?.subject : "",
    body: isEdit ? editedData?.body : "",
  });
  const { subject, body } = inputValue;
  const { user, dept, facult } = selectedOpt;
  const selectArr = selectReportArrFunc(user, faculty, department);
  const router = useRouter();

  const handleOnChange = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = evt.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const onSelect = (newVal: IOpt, name: string) => {
    setSelectedOpt({ ...selectedOpt, [name]: newVal });
  };

  const closeModal = useCallback(() => {
    router.replace(`/complaints`, { scroll: false });
    if (setShow) setShow(null);
  }, [router, setShow]);

  useEffect(() => {
    if (state.data) {
      if (state.data.status) {
        toast.success(state.data.message);
        setInputValue({ subject: "", body: "" });
        if (isEdit) {
          closeModal();
        } else {
          setSelectedOpt({
            user: null,
            dept: null,
            facult: null,
          });
        }
      } else {
        toast.error(state.data.message);
      }
    }
  }, [closeModal, isEdit, state]);

  const disable = Object.values(inputValue).some((value) => value === "");
  const disableHO = disable || !dept;
  const disableDE = disable || !facult;

  return (
    <form className={isEdit ? styles.formEdit : styles.form} action={action}>
      {!isEdit && (
        <div className={styles.titleContainer}>
          <h4 className={styles.title}>Submit Complaint</h4>
          <p>Contact us for any sort of complain</p>
        </div>
      )}

      {selectArr.map((data, idx) => {
        const name = selectArr[idx].name;
        const prefillValue = selectArr[idx].opts.find(
          (itm) => itm.value === selectedOpt[name]?.value
        )?.value;

        return (
          data.show && (
            <CustomSelect
              key={idx}
              name={data.name}
              prefillId={isEdit ? prefillValue : ""}
              options={data.opts}
              placeholder={data.ph}
              onSelect={(val, name) => onSelect(val, name as string)}
            />
          )
        );
      })}

      <input type="hidden" name="id" defaultValue={editedData?.id} />

      <input
        type="hidden"
        name="reportedToUserId"
        defaultValue={
          user?.value === "HO"
            ? `${dept?.value}`
            : user?.value === "DE"
            ? `${facult?.value}`
            : user?.value === "SA"
            ? `${studAffair ? studAffair[0].id : ""}`
            : ""
        }
      />

      <CustomInput
        placeholder="Enter Complaint Subject"
        name="subject"
        value={subject}
        onChange={handleOnChange}
      />

      <div className={styles.textarea}>
        <label htmlFor="complaint">Tell us your complaint</label>
        <textarea
          name="body"
          id="complaint"
          value={body}
          onChange={handleOnChange}
        ></textarea>
      </div>

      <CustomButton
        title={isEdit ? "Update" : "Submit"}
        type="submit"
        disabled={
          user?.value === "DE"
            ? disableDE
            : user?.value === "HO"
            ? disableHO
            : user?.value === "SA"
            ? disable
            : true
        }
      />
    </form>
  );
};
