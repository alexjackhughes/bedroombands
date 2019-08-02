import React from "react";
import "./index.css";

export default function Loader() {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", overflow: "hidden" }}
      className="lds-css ng-scope"
    >
      <div style={{ width: "100%", height: "100%" }} className="lds-eclipse">
        <div />
      </div>
    </div>
  );
}
