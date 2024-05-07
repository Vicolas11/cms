"use client";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { forgetPasswordAction } from "@/services/auth/authActions";
import { isValidEmail } from "@/utils/validinput.util";
import { CustomInput } from "../common/CustomInput";
import CustomButton from "../common/CustomButton";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import styles from "./form.module.scss";
import toast from "react-hot-toast";

export const ForgetForm = () => {
  const [state, action] = useFormState(forgetPasswordAction, { data: null });
  const [isValidInput, setIsValidInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (state.data) {
      if (state.data.status) {
        toast.success(state.data.message);
        router.replace("/resetpassword");
      } else {
        toast.error(state.data.message);
      }
    }
  }, [router, state.data]);

  const handleOnChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;
    setInputValue(value);
    setIsValidInput(!isValidEmail(value));
  };

  const pathName = (name: string) => {
    router.replace(name);
  };

  return (
    <form className={styles.form} action={action}>
      <div className={styles.titleContainer}>
        <h4 className={styles.title}>{"Forgot Password?"}</h4>
        <p>
          Enter your email address and we will send you an OTP to reset your
          password!
        </p>
      </div>

      <CustomInput
        id={"email"}
        type={"email"}
        placeholder={"Enter Email"}
        isError={isValidInput}
        errMsg={"Invalid Email"}
        name={"email"}
        value={inputValue}
        onChange={handleOnChange}
        required
      />

      <CustomButton
        title={"Submit"}
        disabled={!isValidEmail(inputValue)}
      />

      <p>
        {"Remember password?"}{" "}
        <button type="button" onClick={() => pathName("login")}>
          Login
        </button>
      </p>
    </form>
  );
};
