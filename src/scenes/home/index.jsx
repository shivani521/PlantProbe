import React from "react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

function Home() {
  const [files, setFiles] = useState([]);

  const [file, setFile] = useState(null);
  const [base64Image, setBase64Image] = useState(null);

  const handleChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onload = (e) => setBase64Image(e.target.result);
    reader.readAsDataURL(selectedFile);
  };
  const Submit = () => {
    console.log(files[0].name);
    // for now returns the base64 image in console
  };
  const SubmitRequest = () => {
    console.log(base64Image);
  };
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
