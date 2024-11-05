import os
import pandas as pd
import matplotlib.pyplot as plt
import logging
from fastapi import HTTPException

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def visualize_vendor_prices(file_path):
    if not os.path.exists(file_path):
        logger.error("File not found: %s", file_path)
        raise HTTPException(status_code=404, detail="File not found")

    try:
        vendor_data = get_vendors_dict(file_path)
        if not vendor_data:
            return None
        
        labels = list(vendor_data.keys())
        sizes = list(vendor_data.values())
        total = sum(sizes)

        def autopct_func(pct):
            absolute = int(round(pct * total / 100.0))
            return f"{pct:.1f}%\n({absolute})"

        plt.figure(figsize=(10, 7))
        plt.pie(sizes, labels=labels, autopct=autopct_func, startangle=140)
        plt.title("Vendor Distribution by 2024 TRY")
        plt.axis('equal')
        
        image_path = os.path.join("uploads", "vendor_pie_chart.png")
        plt.savefig(image_path)
        plt.close()

        return os.path.basename(image_path)
    except Exception as e:
        logger.error(f"Error visualizing vendor prices: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error visualizing vendor prices: {str(e)}")

def get_vendors_dict(file_path):
    if not os.path.exists(file_path):
        logger.error("File not found: %s", file_path)
        raise HTTPException(status_code=404, detail="File not found")
    
    try:
        df = pd.read_excel(file_path, sheet_name='Chargeback Raw Data', skiprows=4)

        # Group by Vendor and sum the '2024 TRY' column
        vendors_dict = df.groupby("Vendor")["2024 TRY"].sum().to_dict()

        return vendors_dict
    except Exception as e:
        logger.error(f"Error retrieving vendors: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error retrieving vendors: {str(e)}")
