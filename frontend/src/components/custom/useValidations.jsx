import React from "react";
import "./useValidations.css";

export default function useValidations(error, field) {
  const renderErrors = (field) =>
    error?.[field]?.map((error, index) => (
      <div key={index} className="text-validation">
        *{error}
      </div>
    ));
  return renderErrors(field);
}
