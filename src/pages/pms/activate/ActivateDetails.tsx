import React from "react";
import { useParams } from "react-router-dom";

const ActivateDetails = () => {
  const { childId } = useParams();
  return (
    <div>
      <h1>Details</h1>
      {/* <p>Activeid:{activePath}</p> */}
      <p>childd:{childId}</p>
    </div>
  );
};

export default ActivateDetails;
