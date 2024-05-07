"use client";
import {
  SelectOptType,
  InputValueType,
  InputIsValidType,
} from "@/interfaces/generic.interface";
import { CustomInput } from "../common/CustomInput";
import CustomButton from "../common/CustomButton";
import styles from "./form.module.scss";
import { redirect, useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import CustomSelect from "../CustomSelect";
import { IOpt } from "@/interfaces/props.interface";
import {
  isValidAll,
  isValidEmail,
  isValidFullName,
  isValidMatric,
} from "@/utils/validinput.util";
import { inputValArrFunc } from "@/data/localData/components.data";
import { selectArrFunc } from "@/data/localData/selectopts.data";
import { registerUserAction } from "@/services/auth/authActions";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";

export const RegisterForm = () => {
  const [state, action] = useFormState(registerUserAction, { data: null });
  const [selectedOpt, setSelectedOpt] = useState<SelectOptType>({
    user: null,
    dept: null,
    facult: null,
    gender: null,
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
  const { user, dept, facult, gender } = selectedOpt;
  const selectArr = selectArrFunc(user);
  const inputValArr = inputValArrFunc(user as IOpt);
  const formRef = useRef<HTMLFormElement>(null);
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
    !dept ||
    !gender;

  const disableDE =
    !isValidEmail(email) ||
    !isValidFullName(full_name) ||
    password.length < 6 ||
    !facult ||
    !gender;

  const disableHO =
    !isValidEmail(email) ||
    !isValidFullName(full_name) ||
    password.length < 6 ||
    !dept ||
    !gender;

  const disableSA =
    !isValidEmail(email) ||
    !isValidFullName(full_name) ||
    !gender ||
    password.length < 6;

  useEffect(() => {
    if (state.data) {
      // console.log("form =>", state.data);
      if (state.data.status) {
        toast.success(state.data.message);
        formRef.current?.reset();
        router.push("/login");
      } else {
        toast.error(state.data.message);
      }
    }
  }, [state.data, router]);

  return (
    <form ref={formRef} className={styles.form} action={action}>
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

      <input type="hidden" name="role" defaultValue={`${user?.value}`} />
      <input type="hidden" name="gender" defaultValue={`${user?.value}`} />
      <input
        type="hidden"
        name="department"
        defaultValue={`${selectedOpt.dept?.value}`}
      />
      <input
        type="hidden"
        name="faculty"
        defaultValue={`${selectedOpt.facult?.value}`}
      />

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
              required
            />
          )
      )}

      <CustomButton
        title={"Register"}
        type="submit"
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
