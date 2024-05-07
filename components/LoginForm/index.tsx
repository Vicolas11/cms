"use client";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { inputValArrFunc } from "@/data/localData/components.data";
import { loginUserAction } from "@/services/auth/authActions";
import { usersOpts } from "@/data/localData/selectopts.data";
import { redirect, useRouter } from "next/navigation";
import { IOpt } from "@/interfaces/props.interface";
import { CustomInput } from "../common/CustomInput";
import CustomButton from "../common/CustomButton";
import CustomSelect from "../CustomSelect";
import { useFormState } from "react-dom";
import styles from "./form.module.scss";
import {
  InputIsValidType,
  InputValueType,
} from "@/interfaces/generic.interface";
import toast from "react-hot-toast";
import {
  isValidAll,
  isValidEmail,
  isValidMatric,
} from "@/utils/validinput.util";

export const LoginForm = () => {
  const [state, action] = useFormState(loginUserAction, { data: null });
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
  const formRef = useRef<HTMLFormElement>(null);
  const inputValArr = inputValArrFunc(selectedOpt as IOpt, true).filter(
    (val) => val.name !== "full_name"
  );

  useEffect(() => {
    if (state.data) {
      // console.log("form =>", state.data);
      if (state.data.status) {
        toast.success(state.data.message);
        formRef.current?.reset();
        redirect("/report");
      } else {
        toast.error(state.data.message);
      }
    }
  }, [state.data]);

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
    <form ref={formRef} className={styles.form} action={action}>
      <div className={styles.titleContainer}>
        <h4 className={styles.title}>{"Login"}</h4>
        <p>Welcome back. Please login!</p>
      </div>
      <CustomSelect
        options={usersOpts}
        placeholder={`Select User Type`}
        onSelect={onSelect}
      />

      <input type="hidden" name="role" defaultValue={`${selectedOpt?.value}`} />

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
              required
            />
          )
      )}

      <div
        className={styles.forgetPassword}
        onClick={() => pathName("forgetpassword")}
      >
        <p>Forgot Password?</p>
      </div>

      <CustomButton
        title={"Login In"}
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
