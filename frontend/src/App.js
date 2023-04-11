import "./styles/styles.css";
import React from "react";

//import { Router, Route } from 'react-router-dom';

import { FileUploader } from "./components/file-uploader";
//import { ImageDisplay } from "./components/image-display";


export default function App() {
  return (   
      <div className="App">
        <FileUploader/>
     </div>
  );
}


/*
export default function App() {
  return (   
    <Router>
      <div className="App">
        <Route path="/" exact component={FileUploader}/>
        <Route path="/second" exact component={ImageDisplay}/>
     </div>
     </Router>
  );
}
*/
