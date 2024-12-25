import React from "react";
import { FallingLines } from "react-loader-spinner";

export default function Spinner() {
  return (
    <div className="d-flex justify-content-center my-5">
      <FallingLines
        color="#942446"
        width="100"
        visible={true}
        ariaLabel="falling-circles-loading"
      />
    </div>
  );
}
