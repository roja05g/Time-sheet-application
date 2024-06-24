import { useState } from "react";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useDispatch } from "react-redux";
import { sendUserMessage}  from "./ReduxComponents/userMessageActionTypes";

function ApproveData() {
  const [ApprovedLeave, setApprovedLeave] = useState("pending");
  let dispatch = useDispatch();
  
  const handleApprove = () => {
    setApprovedLeave("Approved");
    dispatch(sendUserMessage("Approved"));
  };

  const handleReject = () => {
    setApprovedLeave("rejected");
    dispatch(sendUserMessage("rejected"));
  };
  return (
    <div className="flex justify-evenly align-items-center">
      <span onClick={handleApprove}>
        <TaskAltIcon sx={{ color: ApprovedLeave === "Approved" ? "green" : "gray" }} />
      </span>
      <span onClick={handleReject}>
        <HighlightOffIcon sx={{ color: ApprovedLeave === "rejected" ? "red" : "gray" }} />
      </span>
    </div>
  );
}
export default ApproveData;
