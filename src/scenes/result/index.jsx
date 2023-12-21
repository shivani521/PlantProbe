import React from "react";
import { useEffect } from "react";

function Result() {
  useEffect(() => {
    const response = localStorage.getItem("result");
    console.log("result", response);
    const jsonResult = JSON.parse(response);
    console.log(jsonResult);
  });
  return (
    <div>
      <h1>Result</h1>
    </div>
  );
}

export default Result;
