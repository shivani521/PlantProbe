import React, { useState, useEffect } from "react";
import Icon2 from "../../assets/icon2.jpg";
import "./styles.css";
import { useNavigate } from "react-router-dom";

function Result() {
  const navigate = useNavigate();
  const [apiData, setApiData] = useState(null);
  useEffect(() => {
    const response = localStorage.getItem("result");
    if (response) {
      console.log("result", response);
      const jsonResult = JSON.parse(response);
      console.log(jsonResult);
      setApiData(jsonResult);
    } else {
      navigate("/home");
    }
  }, []);
  const response = localStorage.getItem("result");
  console.log("result", response);
  const jsonResult = JSON.parse(response);
  console.log(jsonResult);

  const renderPreventiveMeasures = () => {
    const isHealthy = jsonResult.result.is_healthy.binary;

    console.log("prevention fetched", isHealthy);
    if (!isHealthy) {
      return (
        <div>
          <h2>Preventive Measures</h2>
          <ul>{/* suggestion.desciption displayed */}</ul>
        </div>
      );
    } else {
      return <p>No preventive measures needed.</p>;
    }
  };
  const diseaseData = jsonResult.result.disease;
  console.log("disease data", diseaseData);
  return (
    <div>
      <h1>Plant Health Result</h1>
      {renderPreventiveMeasures()}
      <div className="main_container">
        <div className="left_col">
          <div className="name_web">PlantProbe</div>
          <div className="head">Take care of your Plants.</div>
          <div className="sub_head">
            Discover the best tips for caring for your indoor plants.Moisture,
            light, temperature...Choose the plant that best suits your home.
          </div>
        </div>
      </div>
      <div className="left"></div>
      <div>
        <img className="Icon2" src={Icon2} alt="this is your icon" />
      </div>
    </div>
  );
}

export default Result;
