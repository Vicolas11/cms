"use client";
import { CustomInput } from "../common/CustomInput";
import CustomButton from "../common/CustomButton";
import styles from "./form.module.scss";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import CustomSelect from "../CustomSelect";
import { IOpt } from "@/interfaces/props.interface";
import {
  InputIsValidType,
  InputValueType,
} from "@/interfaces/generic.interface";
import {
  isValidAll,
  isValidEmail,
  isValidMatric,
} from "@/utils/validinput.util";
import { inputValArrFunc } from "@/data/components.data";
import { usersOpts } from "@/data/selectopts.data";

export const LoginForm = () => {
  const [selectedOpt, setSelectedOpt] = useState<IOpt | null>(null);
  const router = useRouter();
  const [inputValue, setInputValue] = useState<InputValueType>({
    email: "",
    matricNum: "",
    password: "",
  });
  const [isValidInput, setIsValidInput] = useState<InputIsValidType>({
    email: false,
    matricNum: false,
    password: false,
  });
  const { email, matricNum, password } = inputValue;
  const inputValArr = inputValArrFunc(selectedOpt as IOpt, true).filter(
    (val) => val.name !== "full_name"
  );

  const handleOnChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setInputValue({ ...inputValue, [name]: value });
    // Check Input Validation On Input Change
    if (name !== "password")
      setIsValidInput({
        ...isValidInput,
        [name]: !isValidAll(value, name as string),
      });
  };

  const pathName = (name: string) => {
    router.push(name);
  };

  const onSelect = (newVal: IOpt) => {
    setSelectedOpt(newVal);
  };

  const disable = !isValidEmail(email) || password === "";
  const disableST =
    !isValidMatric(matricNum) || password === "" || selectedOpt?.value !== "ST";
  const disableDE = disable || selectedOpt?.value !== "DE";
  const disableHO = disable || selectedOpt?.value !== "HO";
  const disableSA = disable || selectedOpt?.value !== "SA";

  return (
    <form className={styles.form}>
      <div className={styles.titleContainer}>
        <h4 className={styles.title}>{"Login"}</h4>
        <p>Welcome back. Please login!</p>
      </div>
      <CustomSelect
        options={usersOpts}
        placeholder={`Select User Type`}
        onSelect={onSelect}
      />

      {inputValArr.map(
        ({ type, ph, name, show, errMsg }, idx) =>
          show && (
            <CustomInput
              key={idx}
              id={name}
              type={type}
              placeholder={ph}
              isError={isValidInput[name]}
              errMsg={errMsg}
              name={name}
              value={inputValue[name]}
              onChange={handleOnChange}
              showPostIcon={type === "password"}
            />
          )
      )}

      <CustomButton
        title={"Login In"}
        onClick={() => pathName("features")}
        disabled={
          selectedOpt?.value === "ST"
            ? disableST
            : selectedOpt?.value === "DE"
            ? disableDE
            : selectedOpt?.value === "HO"
            ? disableHO
            : selectedOpt?.value === "SA"
            ? disableSA
            : true
        }
      />

      <p>
        {"Don't have an account?"}{" "}
        <button type="button" onClick={() => pathName("register")}>
          Register
        </button>
      </p>
    </form>
  );
};
