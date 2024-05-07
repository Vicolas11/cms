"use client";
import { InputHTMLAttributes, forwardRef, useState } from "react";
import { FaUnlock, FaLock } from "react-icons/fa";
import styles from "./styles.module.scss";

interface InputType extends InputHTMLAttributes<HTMLInputElement> {
  xtraStyle?: string | undefined;
  showPostIcon?: boolean;
  isError?: boolean;
  errMsg?: string;
}

export const CustomInput = forwardRef<HTMLInputElement, InputType>(
  (
    {
      id,
      type,
      value,
      xtraStyle,
      showPostIcon = false,
      isError = false,
      errMsg,
      ...rest
    },
    ref
  ) => {
    const [showPwd, setShowPwd] = useState(false);

    return (
      <div className={styles.container}>
        <div className={styles.inputContainer}>
          <input
            id={id}
            required
            ref={ref}
            type={showPostIcon ? (showPwd ? "text" : "password") : type}
            value={value ? value : ""}
            className={`${styles.input} ${
              isError ? styles.error : ""
            } ${xtraStyle}`}
            {...rest}
          />
          {showPostIcon && (
            <label htmlFor={id}>
              {showPwd ? (
                <span onClick={() => setShowPwd((prev) => !prev)}>
                  <FaUnlock className={styles.unlockIcon} />
                </span>
              ) : (
                <span onClick={() => setShowPwd((prev) => !prev)}>
                  <FaLock className={styles.unlockIcon} />
                </span>
              )}
            </label>
          )}
        </div>
        {isError && (
          <p className={styles.errMsg}>
            {errMsg ? errMsg : "Invalid input value!"}
          </p>
        )}
      </div>
    );
  }
);

CustomInput.displayName = "CustomInput";
