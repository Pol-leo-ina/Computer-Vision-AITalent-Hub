import "../styles/file-uploader.css";
import gufde from '../public/gufde.gif';
import React, { useState } from "react";


export const FileUploader = (methods) => {
  const [image, setImage] = useState();
  const [imageURL, setImageURL] = useState();
  const [isLoadingFile, setIsLoadingFile] = useState(false);
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

  function OnSecondPageButton(evt) {
    evt.preventDefault()

    console.log(image)

    let data = new FormData()
    data.append('file_video', image)

    setIsLoadingFile(true)

    methods.sendDataApi(data)

      .then(data => {
        console.log(data)
        methods.setIsSecondPage(true)
        setIsLoadingFile(false)
      })
      .catch(error => console.log(error))

  }

  return (
    <form className="file-uploader" onSubmit={OnSecondPageButton}>
      <h1>Check in Car</h1>
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
          type="submit"
        >
          Запустить программу
        </button>

        {isLoadingFile && 
          <div style={{ display: 'flex', alignItems: 'center' }}>
          <p style={{ marginRight: '5px' }}>Загружается файл</p>
          <img src={gufde} alt="gufde.gif" className="gufde" width="100" height="100"/>
          </div>}
      
    </form>
  );
};
