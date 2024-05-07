"use client";
import { ButtonHTMLAttributes } from "react";
import styles from "./styles.module.scss";
import { PuffLoader } from "react-spinners";
import { useFormStatus } from "react-dom";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  xtraStyle?: string;
  isOutline?: boolean;
  showLoader?: boolean;
  isDeleteBtn?: boolean;
  dontShow?: boolean;
}

export default function CustomButton({
  title,
  xtraStyle,
  isOutline = false,
  showLoader = false,
  isDeleteBtn,
  disabled,
  dontShow = true,
  ...rest
}: Props) {
  const { pending } = useFormStatus();
  return (
    <button
      className={`${isOutline ? styles.btnOutline : styles.btn} ${
        xtraStyle ? xtraStyle : ""
      }`}
      disabled={disabled || pending}
      {...rest}
    >
      {dontShow &&
        (showLoader ||
          (pending && (
            <PuffLoader color={isDeleteBtn ? "#ffffff" : "#18425D"} size={20} />
          )))}
      {`${title}${dontShow ? (showLoader || pending ? "..." : "") : ""}`}
    </button>
  );
}
