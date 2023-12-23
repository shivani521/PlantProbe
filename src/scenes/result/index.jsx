import React, { useState, useEffect } from "react";
import Icon2 from "../../assets/icon2.jpg";
import "./styles.css";
import { useNavigate } from "react-router-dom";

function Result() {
  const navigate = useNavigate();
  const [apiData, setApiData] = useState(null);
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
