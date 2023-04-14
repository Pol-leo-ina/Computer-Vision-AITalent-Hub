from fastapi import APIRouter, UploadFile, File
import os
import shutil

from torch.utils.data import Dataset, DataLoader
import torch
import cv2
import glob
from torchvision import models
from torchvision.transforms import ToTensor, Compose, Normalize
import numpy as np
import torch.nn as nn

router = APIRouter()

DATA_PATH = 'app/data/videos/'
# IMAGES_PATH = 'app/data/images/'
IMAGES_PATH = 'static/images/'


# save every 5 sec of video
def video_to_frames(path_vid):
    cap = cv2.VideoCapture(path_vid)
    fps = int(cap.get(cv2.CAP_PROP_FPS))
    save_interval = 5

    frame_count = 0
    while cap.isOpened():
        ret, frame = cap.read()
        if ret:
            frame_count += 1

            if frame_count % (fps * save_interval) == 0:
                cv2.imwrite(IMAGES_PATH + 'camera' +
                            str(frame_count) + '.jpg', frame)

        # Break the loop
        else:
            break

    cap.release()


# convert jpg to tensor
def img_to_tensor(img_path):
    img = cv2.imread(img_path)
    trans = Compose([ToTensor(), Normalize(
        [0.485, 0.456, 0.406], [0.229, 0.224, 0.225])])
    img_tns = trans(img)
    return [img_tns, str(img_path)]


# Code To Test Pretrained Model

# PUT YOUR MODEL HERE
device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
model = models.mobilenet_v2()
n = model.classifier[1].in_features
model.classifier = nn.Linear(n, 2)
model = model.to(device)
model.load_state_dict(torch.load(
    "models\model_20230328_082109_best", map_location=device))


@router.get('/predict')
async def test_model():
    """Нарезка видео и тест модели

    Returns:
        {'image_paths':  str[], 'label': str[], 'score': float[]}
    """
    if len(list(os.scandir(DATA_PATH))) == 0:
        return 'Ошибка! Видео не загружено. Загрузите видео.'

    for file in os.scandir(IMAGES_PATH):
        os.remove(file.path)

    try:
        video_path = os.path.join(DATA_PATH, os.listdir(DATA_PATH)[0])
        video_to_frames(video_path)
        test_data = []
        for img_path in os.listdir(IMAGES_PATH):
            test_data_img = img_to_tensor(
                IMAGES_PATH+img_path)
            test_data.append(test_data_img)

        test_data_loader = DataLoader(test_data, batch_size=5,
                                    shuffle=False, num_workers=0)

        # Test Model
        y_pred_list = []
        names = []
        with torch.no_grad():
            model.eval()
            for X_batch, y_batch in test_data_loader:
                X_batch = X_batch.to(device)
                y_test_pred = model(X_batch)
                _, y_pred_tags = torch.max(y_test_pred, dim=1)
                names.append(list(y_batch))
                y_pred_list.append(y_pred_tags.cpu().numpy())

        y_pred_list = [a.squeeze().tolist() for a in y_pred_list]
        # one big list
        y_pred_list_flat = [item for sublist in y_pred_list for item in sublist]
        names_img = [item for sublist in names for item in sublist]

        return {'image_paths': names_img, 'label': y_pred_list_flat}
    
    except:
        return 'error'
