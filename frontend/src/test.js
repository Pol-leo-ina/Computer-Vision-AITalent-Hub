url1 = "http://localhost:8005/"
//Получение данных
const getData = async (url1) => {
    const response = await fetch(url1);
    if (!response.ok) {
        throw new Error(`Ошибка по адресу ${url1}, статус ошибки ${response.status}`);
    }
    return await response.json();
};

//getResourse('database/dataBase.json').then((data) => console.log(data))


//Отправка данных
url2 = "http://localhost:8005/upload-video"

const sendData = async (url2, data) => {
    const response = await fetch(url2, {
        method: 'POST',
        body: data,
    });

    if (!response.ok) {
        throw new Error(`Ошибка по адресу ${url2}, статус ошибки ${response.status}`);
    }
    return await response.json();
}
