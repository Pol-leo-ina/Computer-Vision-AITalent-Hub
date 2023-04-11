import "../styles/image.css";
import React, { useState } from "react";
//import React from "react";
//import ReactDOM from "react-dom";

class Back_button extends React.Component {
    onclick () {
      window.location.assign('http://localhost:3000/');
    }

    render() {
      return (<button  onClick={(e) => this.onclick(e)}>Back </button>);
    }
  }
//export default Back_button;


export const ImageDisplay = () => {
  return (
    <form className="image-display">
      <button
          htmlFor="image-display-button"
          className="image-display__custom-button"
          onClick={Back_button}
        >
          Загрузить новое видео
        </button>
    </form>
  );
};
