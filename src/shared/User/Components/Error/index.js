import React from "react";

export default function Error({ error, ok }) {
  return (
    <div className="error">
      <div>
        <p>{error}</p>
        <div onClick={() => ok("")} className="button">
          Ok
        </div>
      </div>
    </div>
  );
}
