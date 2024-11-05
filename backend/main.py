# uvicorn main:app --reload

import os
import logging
from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import chargeback_process_functions as chrb
import region_visualization as rviz
import vendor_visualization as vviz

app = FastAPI()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow your frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ensure the uploads directory exists
os.makedirs("uploads", exist_ok=True)

@app.post("/api/chargeback/upload")
async def upload_file(file: UploadFile = File(...)):
    try:
        # Save the uploaded file
        file_location = chrb.save_uploaded_file(file)
        return {"file": file_location}
    except HTTPException as e:
        logger.error(f"Error in uploading file: {e.detail}")
        raise
    except Exception as e:
        logger.error(f"Unexpected error in uploading file: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")

@app.get("/api/chargeback/process")
async def process_file(fileName: str):
    file_path = os.path.join("uploads", fileName)
    try:
        # Process the Excel file
        result = chrb.process_excel_file(file_path)
        return result
    except HTTPException as e:
        logger.error(f"Error processing file: {e.detail}")
        raise
    except Exception as e:
        logger.error(f"Unexpected error in processing file: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")

@app.get("/api/chargeback/download/{file_name}")
async def download_file(file_name: str):
    file_path = os.path.join("uploads", file_name)
    if not os.path.exists(file_path):
        logger.error("File not found: %s", file_path)
        raise HTTPException(status_code=404, detail="File not found")
    return FileResponse(path=file_path, filename=file_name, media_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')

@app.get("/api/chargeback/available_regions")
async def available_regions(fileName: str):
    file_path = os.path.join("uploads", fileName)
    try:
        # List all the regions based on the file processed
        regions = chrb.get_available_regions(file_path)
        return {"regions": regions}
    except Exception as e:
        logger.error(f"Error retrieving available regions: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error retrieving available regions: {str(e)}")

@app.get("/api/chargeback/available_vendors")
async def available_vendors(fileName: str):
    file_path = os.path.join("uploads", fileName)
    try:
        # List all the vendors based on the file processed
        vendors = chrb.get_available_vendors(file_path)
        return {"vendors": vendors}
    except Exception as e:
        logger.error(f"Error retrieving available vendors: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error retrieving available vendors: {str(e)}")

@app.get("/api/chargeback/visualize")
async def visualize(fileName: str, selected_regions: str = "", selected_vendors: str = ""):
    file_path = os.path.join("uploads", fileName)
    try:
        region_images = rviz.visualize_regions(file_path, selected_regions.split(','))
        vendor_images = vviz.visualize_vendor_prices(file_path)
        images = region_images + [vendor_images] if vendor_images else region_images
        return {"images": images}
    except HTTPException as e:
        logger.error(f"Error visualizing regions and vendors: {e.detail}")
        raise
    except Exception as e:
        logger.error(f"Unexpected error visualizing regions and vendors: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")

@app.get("/api/chargeback/visualize_image/{image_name}")
async def visualize_image(image_name: str):
    image_path = os.path.join("uploads", image_name)
    if not os.path.exists(image_path):
        logger.error("Image not found: %s", image_path)
        raise HTTPException(status_code=404, detail="Image not found")
    return FileResponse(path=image_path, filename=image_name, media_type='image/png')

@app.get("/api/chargeback/region_image")
async def region_image(fileName: str):
    file_path = os.path.join("uploads", fileName)
    try:
        image_name, zero_price_regions = rviz.visualize_total_prices_by_regions(file_path)
        return {"image": image_name, "zeroPriceRegions": zero_price_regions}
    except HTTPException as e:
        logger.error(f"Error generating region image: {e.detail}")
        raise
    except Exception as e:
        logger.error(f"Unexpected error generating region image: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")

@app.get("/api/chargeback/vendor_image")
async def vendor_image(fileName: str):
    file_path = os.path.join("uploads", fileName)
    try:
        image_name = vviz.visualize_vendor_prices(file_path)
        return {"image": image_name}
    except HTTPException as e:
        logger.error(f"Error generating vendor image: {e.detail}")
        raise
    except Exception as e:
        logger.error(f"Unexpected error generating vendor image: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")



@app.get("/api/chargeback/create_subsidiaries")
async def create_subsidiaries(fileName: str):
    file_path = os.path.join("uploads", fileName)
    try:
        # Process the Excel file to create the subsidiaries file
        chrb.create_subsidaries_excel(file_path)
        subsidiaries_file_name = f"subsidiaries_{os.path.basename(file_path)}"
        return {"subsidiariesFileName": subsidiaries_file_name}
    except HTTPException as e:
        logger.error(f"Error creating subsidiaries Excel file: {e.detail}")
        raise
    except Exception as e:
        logger.error(f"Unexpected error creating subsidiaries Excel file: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")
    
