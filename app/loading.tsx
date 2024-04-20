"use client"
import { ClipLoader } from "react-spinners";
import "./globals.scss";

export default function Loader() {
  return (
    <div className="loader">
      <div>
        <ClipLoader size={40} color="#3E4095" />
      </div>
    </div>
  );
}
