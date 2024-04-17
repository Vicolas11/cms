import { ClipLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className="loader">
      <ClipLoader size={40} color="#3E4095" />
    </div>
  );
}
