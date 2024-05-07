"use client";
import { ChangeEvent, Suspense, useEffect, useState } from "react";
import { InputIsValidType } from "@/interfaces/generic.interface";
import { passwordInput, userDataArrFunc } from "@/data/localData/user.data";
import { CustomInput } from "@/components/common/CustomInput";
import CustomButton from "@/components/common/CustomButton";
import CustomHeader from "@/components/common/CustomHeader";
import { ActionProps } from "@/interfaces/props.interface";
import { isValidCheck } from "@/utils/validinput.util";
import styles from "./account.module.scss";
import { useFormState } from "react-dom";
import {
  changePasswordAction,
  updateUserAction,
} from "@/services/auth/authActions";
import toast from "react-hot-toast";

export default function Account({ userData }: ActionProps) {
  const [state, action] = useFormState(changePasswordAction, { data: null });
  const [formState, formAction] = useFormState(updateUserAction, {
    data: null,
  });
  const user = userDataArrFunc(userData);
  const [inputValue, setInputValue] = useState(
    Object.fromEntries(
      user.filter((val) => val.show).map(({ label, data }) => [label, data])
    )
  );
  const [pwdInputValue, setPwdInputValue] = useState(
    Object.fromEntries(passwordInput.map((val) => [val.label, ""]))
  );
  const [isValidInput, setIsValidInput] = useState<InputIsValidType>({
    "New Password": false,
    "Confirm Password": false,
  });
  const disableSave = Object.values(inputValue).some((val) => val === "");
  const disableUpd =
    Object.values(pwdInputValue).some((val) => val === "") ||
    isValidInput["New Password"] ||
    isValidInput["Confirm Password"] ||
    pwdInputValue["New Password"] !== pwdInputValue["Confirm Password"];

  const handleOnChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = evt.target;
    if (
      ["Confirm Password", "New Password", "Current Password"].includes(name)
    ) {
      setPwdInputValue({ ...pwdInputValue, [name]: value });
    } else {
      setInputValue({ ...inputValue, [name]: value });
    }

    // Check Password Validity
    setIsValidInput({
      ...isValidInput,
      [name]: isValidCheck(name, value, pwdInputValue),
    });
  };

  useEffect(() => {
    if (state.data) {
      if (state.data.status) {
        setPwdInputValue({
          "Current Password": "",
          "New Password": "",
          "Confirm Password": "",
        });
        toast.success(state.data.message);
      } else {
        toast.error(state.data.message);
      }
    }
  }, [state.data]);

  useEffect(() => {
    if (formState.data) {
      if (formState.data.status) {
        toast.success(formState.data.message);
      } else {
        toast.error(formState.data.message);
      }
    }
  }, [formState.data]);

  return (
    <div className={styles.container}>
      <form action={formAction}>
        <CustomHeader text="User Profile" xtraStyle={styles.title} />
        <Suspense>
          <ul className={styles.userInfo}>
            {user.map(
              ({ label, show }, idx) =>
                show && (
                  <li key={idx}>
                    <label htmlFor={label}>{label}</label>
                    <CustomInput
                      id={label}
                      name={label}
                      value={inputValue[label]}
                      onChange={handleOnChange}
                      type={idx === 1 ? "email" : "text"}
                      disabled={[
                        "Email",
                        "Matric Number",
                        "User",
                        "Gender",
                        "Department",
                        "Faculty",
                        "Date Created",
                      ].includes(label)}
                    />
                  </li>
                )
            )}
          </ul>
        </Suspense>
        <div className={styles.btnContainer}>
          <CustomButton
            type="submit"
            title={"Update"}
            xtraStyle={styles.btn}
            disabled={disableSave}
          />
        </div>
      </form>

      <form action={action}>
        <CustomHeader text="Change Password" xtraStyle={styles.title} />
        <ul className={styles.userInfo}>
          {passwordInput.map(({ label, errMsg }, idx) => (
            <li key={idx}>
              <label htmlFor={label}>{label}</label>
              <CustomInput
                id={label}
                type="password"
                isError={isValidInput[label]}
                errMsg={errMsg}
                name={label}
                value={pwdInputValue[label]}
                onChange={handleOnChange}
                showPostIcon
              />
            </li>
          ))}
        </ul>

        <div className={styles.btnContainer}>
          <CustomButton
            type="submit"
            title="Change Password"
            xtraStyle={styles.btn}
            disabled={disableUpd}
          />
        </div>
      </form>
    </div>
  );
}
