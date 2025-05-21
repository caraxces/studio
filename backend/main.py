from fastapi import FastAPI
import requests
from bs4 import BeautifulSoup
from pydantic import BaseModel
from fastapi import UploadFile, File
from PIL import Image
from sqlalchemy import create_engine, Column, Integer, String, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.exc import SQLAlchemyError
import json

class URLInput(BaseModel):
    url: str

app = FastAPI()

@app.get("/")
async def read_root():
    return {"message": "Welcome to your FastAPI backend!"}

# Example SQLAlchemy Model
Base = declarative_base()
class ScrapedData(Base):
    __tablename__ = "scraped_data"

    id = Column(Integer, primary_key=True, index=True)
    url = Column(String(255), index=True)
    data = Column(Text) # Store the scraped table data as JSON string

# Replace with your actual database URL
# Replace with your actual database URL
DATABASE_URL = "mysql+mysqlconnector://user:password@host:port/database_name"

engine = create_engine(DATABASE_URL)
Base.metadata.create_all(bind=engine)

# Dependency to get the database session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

from fastapi import Depends

@app.post("/scrape/")
async def scrape_url(request: URLInput, db: Session = Depends(get_db)):
    try:
        response = requests.get(request.url)
        response.raise_for_status()  # Raise an exception for bad status codes
        # Use response.content for potentially non-UTF-8 content
        soup = BeautifulSoup(response.content, 'html.parser') 
        tables = []
        for table in soup.find_all('table'):            
            rows = []
            for row in table.find_all('tr'):
                cells = [cell.get_text(strip=True) for cell in row.find_all(['td', 'th'])]
                rows.append(cells)
 tables.append(rows)

        # Save scraped data to database
        if tables:  # Only save if tables were found
            scraped_entry = ScrapedData(url=request.url, data=json.dumps(tables))
            db.add(scraped_entry)
            db.commit()
            db.refresh(scraped_entry)
            return {"tables": tables, "message": "Data scraped and saved successfully!"}
        else:
            return {"tables": [], "message": "No tables found on the page"}
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}
    

@app.post("/process-image")
async def process_image(file: UploadFile = File(...)):
    # Read the image file
    image = Image.open(file.file)

    # Process the image (resize and compress - placeholder)
    # You'll need to implement the actual resizing and compression logic here
    # to target a maximum size of ~20MB while maintaining aspect ratio.\n
    # This is a simplified example that just saves and returns the original.

    processed_image_path = "processed_image.png" # Or a temporary path
    image.save(processed_image_path)
 from fastapi.responses import FileResponse
 # In a real application, you might store and serve the image differently
 # For now, let's just return a success message.
 # You could return a URL or a base64 encoded image if needed by the frontend.
 return {"message": "Image processed (placeholder). File saved temporarily."}

