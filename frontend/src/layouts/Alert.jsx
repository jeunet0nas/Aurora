import React from "react";
import { IoWarningOutline } from "react-icons/io5";

export default function Alert({ type, content }) {
  return (
    <div className="row mt-4">
      <div className="col-md-12 mx-auto">
        <div
          className={`alert alert-${type} d-flex align-items-center`}
          style={{ background: "#e8d4c0", color: "#942446", border: "none" }}
        >
          <IoWarningOutline
            style={{ marginRight: "1rem", marginLeft: "2rem" }}
          />
          <div>{content}</div>
        </div>
      </div>
    </div>
  );
}
