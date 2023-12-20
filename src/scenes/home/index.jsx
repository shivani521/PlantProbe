import React from "react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

function Home() {
  const [file, setFile] = useState(null);
  const [base64Image, setBase64Image] = useState(null);
  const [list_image, setListImage] = useState([]);
  const handleChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = e.target.result;
      setBase64Image(imageData);
      setListImage([imageData]);
    };
    reader.readAsDataURL(selectedFile);
  };
  // data:image/jpeg;base64,

  async function handleFormSubmit(event) {
    console.log("list_image", [base64Image]);

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
      <div>
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
      </div>
      <button onClick={SubmitRequest}>Submit</button>
    </div>
  );
}

export default Home;
