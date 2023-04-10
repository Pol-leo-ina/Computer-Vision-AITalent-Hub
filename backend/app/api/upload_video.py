from fastapi import APIRouter, UploadFile, File
import os
import shutil

router = APIRouter()

DATA_PATH = 'app/data/videos'


@router.post('/search-video')
async def save_video(file_video: UploadFile = File(...)):
    """Загрузка видео

    Args:
        file_video (UploadFile, optional): входное видео

    Returns:
        status (str): ok or error
    """
    for file in os.scandir(DATA_PATH):
        os.remove(file.path)

    print(file_video)
    with open(os.path.join(DATA_PATH, file_video.filename), 'wb') as wf:
        shutil.copyfileobj(file_video.file, wf)
        file_video.file.close()  # удаляет временный

    return 'ok'
