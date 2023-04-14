import "./styles/styles.css";
import React, { useState } from "react";

import { FileUploader } from "./components/file-uploader";
import { ImageDisplay } from "./components/image-display";
import {getData, sendData} from './back';

import { CurrentUserContext } from './contexts/CurrentPageContext';


export default function App() {
  const [isSecondPage, setIsSecondPage] = useState(false)

  function getDataApi() {
    return getData()
  }
  
  function sendDataApi(video) {
    return sendData(video)
  }

  return (   
      <div className="App">
        {
          !isSecondPage &&  <FileUploader setIsSecondPage={setIsSecondPage} sendDataApi={sendDataApi} />
        }
        {
          isSecondPage && <ImageDisplay setIsSecondPage={setIsSecondPage} getDataApi={getDataApi} />
        }
     </div>
  );
}
