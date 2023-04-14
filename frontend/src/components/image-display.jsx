import "../styles/image.css";
import gufdi from '../public/gufdi.gif';
import React, { useEffect, useState } from "react"


export const ImageDisplay = (methods) => {
  const [isVisibleImages, setIsVisibleImages] = useState(false)
  const [images, setImages] = useState(null);
  const [labels, setLabels] = useState(null);
  const [isLoadingImages, setIsLoadingImages] = useState(false);

  function handleClick(evt) {
    evt.preventDefault()

    methods.setIsSecondPage(false)
  }

  useEffect(() => {

    setIsLoadingImages(true)

    methods.getDataApi()
      .then(data => {
        console.log(data)

        setImages(data['image_paths'])
        setLabels(data['label'])

        setIsVisibleImages(true)
        setIsLoadingImages(false)
      })
  
  }, [])

  return (
    <form className="image-display">

      <button
          htmlFor="image-display-button"
          className="image-display__custom-button"
          onClick={handleClick}
        >
          Загрузить новое видео
        </button>

      {isLoadingImages && 
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <label style={{ marginRight: '5px' }}>Модель распознает использование телефона за рулем</label>
        <img src={gufdi} alt="gufdi.gif" className="gifkaGufdi" width="20" height="20"/>
      </div>}

      {isVisibleImages && 
        images.map((currImage, index) => {
          return <div key={index*10}>
            <img src={currImage.replace('static/', '')}></img>
            {/* <p>{currImage}</p> */}
            <p>{`${labels[index] == 1 ? 'Phone' : 'No_phone'}`}</p>
            <button type="button">Согласен</button>
            <button type="button">Не согласен</button>
          </div>
        })
      }
    </form>
  );
};
