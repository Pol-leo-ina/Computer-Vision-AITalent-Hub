from fastapi import APIRouter

from app.api import upload_video, frontend, predict

api_router = APIRouter()

api_router.include_router(upload_video.router, tags=["upload-video"])

api_router.include_router(predict.router, tags=["predict"])

api_router.include_router(frontend.router, tags=["frontend"])
