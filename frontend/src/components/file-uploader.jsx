import "../styles/file-uploader.css";
import React, { useState } from "react";
//import React from "react";
//import ReactDOM from "react-dom";

class OnSecondPageButton extends React.Component {
  onclick () {
    window.location.assign('http://localhost:3000/second/');
  }

  render() {
    return (<a onClick={(e) => this.onclick(e)}><i className="fas fa-chart-bar"></i></a>);
  }
}
//export default Statistics_button;

export const FileUploader = () => {
  const [image, setImage] = useState();
  const [imageURL, setImageURL] = useState();
  const fileReader = new FileReader();
  fileReader.onloadend = () => {
    setImageURL(fileReader.result);
  };
  const handleOnChange = (event) => {
    event.preventDefault();
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      setImage(file);
      fileReader.readAsDataURL(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files && event.dataTransfer.files.length) {
      setImage(event.dataTransfer.files[0]);
      fileReader.readAsDataURL(event.dataTransfer.files[0]);
    }
  };

  const handleDragEmpty = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <form className="file-uploader">
      <label
        htmlFor="file-loader-button"
        className="file-uploader__custom-button"
      >
        Загрузить файл
      </label>
      <input
        id="file-loader-button"
        type="file"
        className="file-uploader__upload-button"
        onChange={handleOnChange}
      />
      <img
        src={imageURL ? imageURL : "no_photo.jpg"}
        className="file-uploader__preview"
        alt="preview"
        onDrop={handleDrop}
        onDragEnter={handleDragEmpty}
        onDragOver={handleDragEmpty}
      />
      <div className="file-uploader__file-name">{image ? image.name : ""}</div>
      <button
          htmlFor="file-start-button"
          className="file-start__custom-button"
          onClick={OnSecondPageButton}
        >
          Запустить программу
        </button>
    </form>
  );
};
