from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from sqlalchemy import create_engine, Column, Integer, String, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
import os

app = FastAPI()

# Database setup
DATABASE_URL = "sqlite:///./youglish.db"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Models
class Media(Base):
    __tablename__ = "media"
    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, index=True)
    path = Column(String)

class Subtitle(Base):
    __tablename__ = "subtitle"
    id = Column(Integer, primary_key=True, index=True)
    media_id = Column(Integer, ForeignKey('media.id'))
    time = Column(String)
    text = Column(String)
    media = relationship("Media", back_populates="subtitles")

Media.subtitles = relationship("Subtitle", order_by=Subtitle.id, back_populates="media")

# Create tables
Base.metadata.create_all(bind=engine)

# Endpoints
@app.get("/api/index")
async def index_media():
    # Logic to index media files
    return {"message": "Indexing media files"}

@app.get("/api/search")
async def search_subtitles(q: str):
    # Logic to search subtitles
    return {"message": f"Searching for {q}"}

@app.get("/media/{media_id}/stream")
async def stream_media(media_id: int):
    # Logic to stream media
    return StreamingResponse(content="", media_type="video/mp4") 