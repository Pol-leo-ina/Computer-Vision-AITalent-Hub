export const getData = () => {
    return fetch("http://localhost:8005/predict", {
         method: 'GET',
    })
        .then(response => {if (response?.ok) return response.json(); else return Promise.reject('Ошибка')})
}

getData()
    .then(data => {
        console.log(data)
})


export const sendData = (file_video) => {
    return fetch("http://localhost:8005/upload-video", {
         method: 'POST',
         body: file_video
    })
    
        .then(response => {if (response?.ok) return response.json(); else return Promise.reject('Ошибка')})
}

sendData()
    .then(data => {
        console.log(data)
})
