import os
from sqlalchemy.orm import Session
from .database import SessionLocal, engine, Base
from .app import Media, Subtitle

# Function to index media files
def index_media_files(directory: str):
    db: Session = SessionLocal()
    try:
        for root, dirs, files in os.walk(directory):
            for file in files:
                if file.endswith(('.mp4', '.mkv')):
                    media_path = os.path.join(root, file)
                    media = Media(filename=file, path=media_path)
                    db.add(media)
        db.commit()
    finally:
        db.close()

# Function to index subtitle files
def index_subtitle_files(directory: str):
    db: Session = SessionLocal()
    try:
        for root, dirs, files in os.walk(directory):
            for file in files:
                if file.endswith(('.srt', '.vtt')):
                    subtitle_path = os.path.join(root, file)
                    # Logic to parse subtitle file and add entries to the database
                    # This is a placeholder for actual parsing logic
                    pass
        db.commit()
    finally:
        db.close() 