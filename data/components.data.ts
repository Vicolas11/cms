import { IOpt } from "@/interfaces/props.interface";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { FaShippingFast } from "react-icons/fa";
import { MdOutlinePrivacyTip } from "react-icons/md";

export const inputValArrFunc = (arg: IOpt, isLogin = false) => {
    return [
      {
        type: "text",
        name: "matricNum",
        ph: "Matric Number",
        show: isLogin
          ? arg?.value !== "DE" && arg?.value !== "HO" && arg?.value !== "SA"
          : arg?.value === "ST",
        errMsg: "Invalid matric number",
      },
      {
        type: "text",
        name: "full_name",
        ph: "Full Name",
        show: true,
        errMsg: "Enter first and last name or other names",
      },
      {
        type: "email",
        name: "email",
        ph: "Email",
        show: isLogin
          ? arg?.value === "DE" || arg?.value === "HO" || arg?.value === "SA"
          : true,
        errMsg: "Invalid email address",
      },
      {
        type: "password",
        name: "password",
        ph: "Password",
        show: true,
        errMsg: "Password length must be 6 or more",
      },
    ];
  };
  
  export const featureData = [
    {
      Icon: FaShippingFast,
      title: "Swift Complaint Resolution",
      subtitle:
        "Swift grievance resolution priorities timely and effective solutions ensuring students' concerns are promptly addressed and resolved",
    },
    {
      Icon: MdOutlinePrivacyTip,
      title: "Privacy Assurance",
      subtitle:
        "Your complaints are handled with utmost confidentiality, ensuring privacy and trust throughout the whole complaint process.",
    },
    {
      Icon: AiOutlineThunderbolt,
      title: "Easy Communication",
      subtitle:
        "Effortless communication is facilited, providing a smooth and accessible channel for expressing and resolving complaint within the school",
    },
  ];
  