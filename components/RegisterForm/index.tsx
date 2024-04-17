"use client";
import {
  SelectOptType,
  InputValueType,
  InputIsValidType,
} from "@/interfaces/generic.interface";
import { CustomInput } from "../common/CustomInput";
import CustomButton from "../common/CustomButton";
import styles from "./form.module.scss";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import CustomSelect from "../CustomSelect";
import { IOpt } from "@/interfaces/props.interface";
import {
  isValidAll,
  isValidEmail,
  isValidFullName,
  isValidMatric,
} from "@/utils/validinput.util";
import { inputValArrFunc } from "@/data/components.data";
import { selectArrFunc } from "@/data/selectopts.data";

export const RegisterForm = () => {
  const [selectedOpt, setSelectedOpt] = useState<SelectOptType>({
    user: null,
    dept: null,
    facult: null,
  });
  const [inputValue, setInputValue] = useState<InputValueType>({
    email: "",
    full_name: "",
    matricNum: "",
    password: "",
  });
  const [isValidInput, setIsValidInput] = useState<InputIsValidType>({
    email: false,
    full_name: false,
    matricNum: false,
    password: false,
  });
  const { email, matricNum, password, full_name } = inputValue;
  const { user, dept, facult } = selectedOpt;
  const selectArr = selectArrFunc(user);
  const inputValArr = inputValArrFunc(user as IOpt);
  const router = useRouter();

  const handleOnChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setInputValue({ ...inputValue, [name]: value });

    // Check Input Validation On Input Change
    setIsValidInput({
      ...isValidInput,
      [name]: !isValidAll(value, name as string),
    });
  };

  const pathName = (name: string) => {
    router.push(name);
  };

  const onSelect = (newVal: IOpt, name: string) => {
    setSelectedOpt({ ...selectedOpt, [name]: newVal });
  };

  const disableST =
    !isValidEmail(email) ||
    !isValidMatric(matricNum) ||
    !isValidFullName(full_name) ||
    password.length < 6 ||
    !dept;

  const disableDE =
    !isValidEmail(email) ||
    !isValidFullName(full_name) ||
    password.length < 6 ||
    !facult;

  const disableHO =
    !isValidEmail(email) ||
    !isValidFullName(full_name) ||
    password.length < 6 ||
    !dept;

  const disableSA =
    !isValidEmail(email) || !isValidFullName(full_name) || password.length < 6;

  return (
    <form className={styles.form}>
      <div className={styles.titleContainer}>
        <h4 className={styles.title}>Register</h4>
        <p>Please select user type and register</p>
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

      {/* INPUTS */}
      {inputValArr.map(
        ({ type, ph, name, show, errMsg }, idx) =>
          show && (
            <CustomInput
              key={idx}
              type={type}
              id={name}
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
        title={"Register"}
        onClick={() => pathName("features")}
        disabled={
          user?.value === "ST"
            ? disableST
            : user?.value === "DE"
            ? disableDE
            : user?.value === "HO"
            ? disableHO
            : user?.value === "SA"
            ? disableSA
            : true
        }
      />

      <p>
        I already have an account!{" "}
        <button type="button" onClick={() => pathName("login")}>
          Login
        </button>
      </p>
    </form>
  );
};
