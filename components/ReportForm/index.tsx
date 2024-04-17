"use client";
import { SelectOptType } from "@/interfaces/generic.interface";
import React, { ChangeEvent, useState } from "react";
import { IOpt } from "@/interfaces/props.interface";
import { CustomInput } from "../common/CustomInput";
import CustomButton from "../common/CustomButton";
import CustomSelect from "../CustomSelect";
import styles from "./form.module.scss";
import { selectReportArrFunc } from "@/data/selectopts.data";

export const ReportForm = () => {
  const [selectedOpt, setSelectedOpt] = useState<SelectOptType>({
    user: null,
    dept: null,
    facult: null,
  });
  const [inputValue, setInputValue] = useState({
    subject: "",
    complaint: "",
  });
  const { subject, complaint } = inputValue;
  const { user, dept, facult } = selectedOpt;
  const selectArr = selectReportArrFunc(user);

  const handleOnChange = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = evt.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const onSelect = (newVal: IOpt, name: string) => {
    setSelectedOpt({ ...selectedOpt, [name]: newVal });
  };

  const disable = Object.values(inputValue).some((value) => value === "");
  const disableHO = disable || !dept;
  const disableDE = disable || !facult;

  return (
    <form className={styles.form}>
      <div className={styles.titleContainer}>
        <h4 className={styles.title}>Submit Complaint</h4>
        <p>Contact us for any sort of complain</p>
      </div>

      {selectArr.map(
        (data, idx) =>
          data.show && (
            <CustomSelect
              key={idx}
              name={data.name}
              options={data.opts}
              placeholder={data.ph}
              onSelect={(val, name) => onSelect(val, name as string)}
            />
          )
      )}

      <CustomInput
        placeholder="Enter Complaint Subject"
        name="subject"
        value={subject}
        onChange={handleOnChange}
      />

      <div className={styles.textarea}>
        <label htmlFor="complaint">Tell us your complaint</label>
        <textarea
          name="complaint"
          id="complaint"
          value={complaint}
          onChange={handleOnChange}
        ></textarea>
      </div>

      <CustomButton
        title={"Submit"}
        onClick={() => {}}
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
