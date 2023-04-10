import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);


//Получение данных от сервера
urlGet = "http://localhost:8005/"
const getData = async () => {
  return fetch(urlGet, {
    method: 'GET',
  })
  .then(response => response.json())
}

//Отправка данных на сервер
urlSend = "http://localhost:8005/upload-video"
const sendData = async () => {
  return fetch(urlSend, {
    method: 'POST',
  })
  .then(response => response.json())
}


getData()
    .then(data => {
        // Обработка data. data - dict с ключами, которые скинул выше
        console.log(data)
})

sendData()
    .then(data => {
        // Обработка data. data - dict с ключами, которые скинул выше
        console.log(data)
})
