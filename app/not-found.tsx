import CustomButton from "@/components/common/CustomButton";
import Link from "next/link";
import React from "react";
import "./globals.scss";

export default function NotFound() {
  return (
    <div className="errContent">
      <h1>404</h1>
      <p>Page Not Found!</p>
      <Link href="/">
        <CustomButton title="Go Home" />{" "}
      </Link>
    </div>
  );
}
