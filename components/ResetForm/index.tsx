"use client";
import { isValidAll, isValidEmail } from "@/utils/validinput.util";
import { resetPasswordAction } from "@/services/auth/authActions";
import React, { ChangeEvent, useEffect, useState } from "react";
import { inputResetArrFunc } from "@/data/localData/components.data";
import { CustomInput } from "../common/CustomInput";
import CustomButton from "../common/CustomButton";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import styles from "./form.module.scss";
import {
  InputIsValidType,
  InputValueType,
} from "@/interfaces/generic.interface";
import toast from "react-hot-toast";

export const ResetForm = () => {
  const [state, action] = useFormState(resetPasswordAction, { data: null });
  const router = useRouter();
  const [inputValue, setInputValue] = useState<InputValueType>({
    otp: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [isValidInput, setIsValidInput] = useState<InputIsValidType>({
    otp: false,
    email: false,
    password: false,
    confirm_password: false,
  });
  const { email, otp, password, confirm_password } = inputValue;
  const inputValArr = inputResetArrFunc();

  useEffect(() => {
    if (state.data) {
      if (state.data.status) {
        toast.success(state.data.message);
        router.replace("/login");
      } else {
        toast.error(state.data.message);
      }
    }
  }, [router, state.data]);

  const handleOnChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setInputValue({ ...inputValue, [name]: value });
    // Check Input Validation On Input Change
    setIsValidInput({
      ...isValidInput,
      [name]: !isValidAll(value, name as string, password),
    });
  };

  const pathName = (name: string) => {
    router.replace(name);
  };

  const disable =
    !isValidEmail(email) ||
    password === "" ||
    confirm_password === "" ||
    otp.length !== 6 ||
    password !== confirm_password;

  return (
    <form className={styles.form} action={action}>
      <div className={styles.titleContainer}>
        <h4 className={styles.title}>{"Reset New Password"}</h4>
        <p>Enter the OTP send to your email to Reset Password!</p>
      </div>

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

      <CustomButton title={"Reset Password"} disabled={disable} />

      <p>
        {"Did NOT get OTP code?"}{" "}
        <button type="button" onClick={() => pathName("/resendforgetpassword")}>
          Resend OTP
        </button>
      </p>
    </form>
  );
};
