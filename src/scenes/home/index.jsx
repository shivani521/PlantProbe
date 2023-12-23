import React from "react";
import { useState, useEffect } from "react";
// import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import "./index.css";
import YourImage from "../../assets/Image.png";
import YourIcon from "../../assets/Icon.jpg";
import yourPlant2 from "../../assets/Plant 2.png";
import Icon2 from "../../assets/icon2.jpg";

import "./index.css";

function Home() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [base64Image, setBase64Image] = useState(null);
  const [list_image, setListImage] = useState([]);
  const handleChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onload = (e) => setBase64Image(e.target.result);
    reader.onload = (e) => {
      const imageData = e.target.result;
      setBase64Image(imageData);
      setListImage([imageData]);
    };
    reader.readAsDataURL(selectedFile);
  };
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  // data:image/jpeg;base64,
  async function handleFormSubmit(event) {
    const response = await fetch(
      "https://plant.id/api/v3/health_assessment?details=local_name,description,url,treatment,classification,common_names,cause",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Api-Key": `${process.env.REACT_APP_USER_API_KEY}`,
        },

        body: JSON.stringify({
          images: [base64Image],
          latitude,
          longitude,
          similar_images: true,
        }),
      }
    );
    const data = await response.json();
    console.log(data);
    const result = await data;
    localStorage.setItem("result", JSON.stringify(result));
    navigate("/result");
  }
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  // Fetching the location of the user will prompt user for location

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    }
  }, []);
  return (
    <div>
      <div className="main_container">
        <div className="left_col">
          <div className="name_web">PlantProbe</div>
          <div className="head">Take care of your Plants.</div>
          <div className="sub_head">
            Discover the best tips for caring for your indoor plants.Moisture,
            light, temperature...Choose the plant that best suits your home.
          </div>
          <button onClick={() => scrollToSection("sectionId")}>Try Now!</button>
          <svg
            className="plantSVG"
            xmlns="http://www.w3.org/2000/svg"
            width="369"
            height="324"
            viewBox="0 0 369 324"
            fill="none"
          >
            <path
              d="M369 356L-216 356V292.5C-216 130.957 -85.0433 -9.29832e-06 76.5 -9.29832e-06C238.043 -9.29832e-06 369 130.957 369 292.5V356Z"
              fill="#FFF3C9"
            />
          </svg>
          <img className="your_plant2" src={yourPlant2} alt="plant 2" />
        </div>
        <div className="right_col">
          <svg
            className="rectSVG"
            xmlns="http://www.w3.org/2000/svg"
            width="584"
            height="807"
            viewBox="0 0 584 807"
            fill="none"
          >
            <path
              d="M0.473755 -273.979H583.808V515.323C583.808 676.407 453.225 806.991 292.141 806.991C131.058 806.991 0.473755 676.407 0.473755 515.323V-273.979Z"
              fill="#C0F5D8"
            />
          </svg>
          <img className="your_plant" src={YourImage} alt="your plant" />
          <svg
            className="greyContainer"
            xmlns="http://www.w3.org/2000/svg"
            width="443"
            height="221"
            viewBox="0 0 443 221"
            fill="none"
          >
            <path
              d="M391.726 573.894C353.778 565.441 316.887 546.72 291.124 517.135C267.027 489.449 267.937 453.546 248.105 424.241C226.844 392.846 184.603 400.605 152.611 404.905C112.932 410.252 71.6375 406.13 38.7474 380.79C-25.4055 331.343 -1.48976 241.287 54.8368 203.172C89.8339 179.508 143.687 178.257 184.384 170.384C243.235 159.015 284.149 127.499 320.15 81.5064C345.187 49.5207 370.926 15.9761 411.825 4.983C467.874 -10.0809 527.102 14.2178 564.333 57.0083C599.856 97.8653 616.898 151.699 625.62 205.127C634.786 261.359 635.736 318.622 628.438 375.125C622.498 421.004 610.732 467.076 585.667 505.972C566.964 534.97 539.471 562.881 506.603 575.143C490.257 581.244 470.248 579.635 452.867 579.993C432.316 580.413 411.789 578.366 391.726 573.894Z"
              fill="#F1F1F1"
            />
          </svg>
          <img className="your_icon" src={YourIcon} alt="your icon" />
        </div>
      </div>
      <div className="left">
        <div id="sectionId" className="container">
          <h1 className="heading">Submit a picture of your plant:</h1>
          <div className="content">
            <label htmlFor="fileInput">Select image:</label>
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              onChange={handleChange}
            />
            {file && !base64Image && <p>Loading image...</p>}
            {base64Image && (
              <img
                src={base64Image}
                alt="Converted image"
                style={{ maxWidth: "500px", maxHeight: "300px" }}
              />
            )}
            <button className="submitBtn" onClick={handleFormSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
      {/* <div className="right_col">
        <svg
          className="rectSVG"
          xmlns="http://www.w3.org/2000/svg"
          width="584"
          height="807"
          viewBox="0 0 584 807"
          fill="none"
        >
          <path
            d="M0.473755 -273.979H583.808V515.323C583.808 676.407 453.225 806.991 292.141 806.991C131.058 806.991 0.473755 676.407 0.473755 515.323V-273.979Z"
            fill="#C0F5D8"
          />
        </svg>
        <img className="your_plant" src={YourImage} alt="your plant" />
        <svg
          className="greyContainer"
          xmlns="http://www.w3.org/2000/svg"
          width="443"
          height="221"
          viewBox="0 0 443 221"
          fill="none"
        >
          <path
            d="M391.726 573.894C353.778 565.441 316.887 546.72 291.124 517.135C267.027 489.449 267.937 453.546 248.105 424.241C226.844 392.846 184.603 400.605 152.611 404.905C112.932 410.252 71.6375 406.13 38.7474 380.79C-25.4055 331.343 -1.48976 241.287 54.8368 203.172C89.8339 179.508 143.687 178.257 184.384 170.384C243.235 159.015 284.149 127.499 320.15 81.5064C345.187 49.5207 370.926 15.9761 411.825 4.983C467.874 -10.0809 527.102 14.2178 564.333 57.0083C599.856 97.8653 616.898 151.699 625.62 205.127C634.786 261.359 635.736 318.622 628.438 375.125C622.498 421.004 610.732 467.076 585.667 505.972C566.964 534.97 539.471 562.881 506.603 575.143C490.257 581.244 470.248 579.635 452.867 579.993C432.316 580.413 411.789 578.366 391.726 573.894Z"
            fill="#F1F1F1"
          />
        </svg>
        <img className="your_icon" src={YourIcon} alt="your icon" />
      </div> */}
    </div>
  );
}

export default Home;
