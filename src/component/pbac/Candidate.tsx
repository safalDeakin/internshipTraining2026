import React from "react";
import { canAccess } from "./authorization";
import { action, resource } from "./permissions";

interface User {
  role: string;
}
interface CanditeProps {
  user: User;
}
const Candidate = ({ user }: CanditeProps) => {
  //   const canView = canAccess({
  //     user,
  //     resource: resource.CANDIDATE,
  //     action: action.VIEW,
  //   });
  //   const canApprove = canAccess({
  //     user,
  //     resource: resource.CANDIDATE,
  //     action: action.APPROVE,
  //   });

  //   const canDelete = canAccess({
  //     user,
  //     resource: resource.CANDIDATE,
  //     action: action.DELETE,
  //   });

  //   const handleview = () => {
  //     alert("VIEW CANDIDATE");
  //   };
  //   const handleapprove = () => {
  //     alert("APPROVE CANDIDATE");
  //   };
  //   const handledelete = () => {
  //     alert("DELETE CANDIDATE");
  //   };

  const handleAction = (actionType: string) => {
    const allowed = canAccess({
      user,
      resource: resource.CANDIDATE,
      action: actionType,
    });
    if (!allowed) {
      alert(`not allow to perform ${actionType}as ${user.role}`);
    }
    alert(`${user.role} allowed for this ${actionType} action`);
  };
  return (
    <div className="bg-blue-50 rounded-2xl border border-gray-500 p-5">
      <h1 className="font-bold">Candidates</h1>
      <p className="text-gray-600">CUREENT ROLE:{user.role}</p>
      <div className="p-2 flex ">
        <h1>JOHn</h1>
        <p>- Frontend </p>
      </div>

      <button
        className="bg-amber-100 p-2 rounded-2xl border border-gray-500"
        onClick={() => handleAction(action.VIEW)}
      >
        View Candidate
      </button>

      <button
        className="bg-amber-100 p-2 rounded-2xl border border-gray-500"
        onClick={() => handleAction(action.APPROVE)}
      >
        Approve Candidate
      </button>

      <button
        className="bg-amber-100 p-2 rounded-2xl border border-gray-500"
        onClick={() => handleAction(action.DELETE)}
      >
        Delete Candidate
      </button>
    </div>
  );
};

export default Candidate;
