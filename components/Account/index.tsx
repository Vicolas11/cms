"use client";
import { InputIsValidType } from "@/interfaces/generic.interface";
import { CustomInput } from "@/components/common/CustomInput";
import CustomButton from "@/components/common/CustomButton";
import CustomHeader from "@/components/common/CustomHeader";
import { isValidCheck } from "@/utils/validinput.util";
import { userDataArrFunc } from "@/data/user.data";
import { ChangeEvent, useState } from "react";
import styles from "./account.module.scss";

export default function Account() {
  const userData = userDataArrFunc();
  const [inputValue, setInputValue] = useState(
    Object.fromEntries(userData.map((val) => [val.label, val.data]))
  );
  const [isValidInput, setIsValidInput] = useState<InputIsValidType>({
    "New Password": false,
    "Confirm Password": false,
  });
  const slicedObj = Object.entries(inputValue);
  const savedInput = Object.fromEntries(slicedObj.slice(0, 4));
  const updInput = Object.fromEntries(slicedObj.slice(4));
  const disableSave = Object.values(savedInput).some((val) => val === "");
  const disableUpd =
    Object.values(updInput).some((val) => val === "") ||
    isValidInput["New Password"] ||
    isValidInput["Confirm Password"] ||
    inputValue["New Password"] !== inputValue["Confirm Password"];

  const handleOnChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = evt.target;
    setInputValue({ ...inputValue, [name]: value });
    // Check Password Validity
    if (name === "New Password" || name === "Confirm Password") {
      setIsValidInput({
        ...isValidInput,
        [name]: isValidCheck(name, value, inputValue),
      });
    }
  };

  return (
    <div className={styles.container}>
      <CustomHeader text="User Profile" xtraStyle={styles.title} />
      <ul className={styles.userInfo}>
        {userData.slice(0, 5).map(
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
                  disabled={
                    label === "Email" ||
                    label === "Matric Number" ||
                    label === "User" ||
                    label === "Date Created"
                  }
                />
              </li>
            )
        )}
      </ul>
      <div className={styles.btnContainer}>
        <CustomButton
          title={"Update"}
          xtraStyle={styles.btn}
          disabled={disableSave}
        />
      </div>
      <CustomHeader text="Change Password" xtraStyle={styles.title} />
      <ul className={styles.userInfo}>
        {userData.slice(5).map(({ label, errMsg }, idx) => (
          <li key={idx}>
            <label htmlFor={label}>{label}</label>
            <CustomInput
              id={label}
              type="password"
              isError={isValidInput[label]}
              errMsg={errMsg}
              name={label}
              value={inputValue[label]}
              onChange={handleOnChange}
              showPostIcon
            />
          </li>
        ))}
      </ul>
      <div className={styles.btnContainer}>
        <CustomButton
          title="Change Password"
          xtraStyle={styles.btn}
          disabled={disableUpd}
        />
      </div>
    </div>
  );
}
