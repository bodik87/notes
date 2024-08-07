import { useNavigate } from "react-router-dom";
import { BackIcon } from "./icons";

export default function BackButton() {
  const navigate = useNavigate();
  return (
    <button className="btn bg-app-gray" onClick={() => navigate(-1)}>
      <BackIcon />
    </button>
  );
}
