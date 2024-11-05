import os
import pandas as pd
import matplotlib.pyplot as plt
import logging
from fastapi import HTTPException
from dictionaries import get_regions_dict

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def visualize_regions(file_path, selected_regions):
    if not os.path.exists(file_path):
        logger.error("File not found: %s", file_path)
        raise HTTPException(status_code=404, detail="File not found")

    try:
        df = pd.read_excel(file_path, sheet_name='Chargeback Raw Data', skiprows=4)
        regions_dict = get_regions_dict()

        images = []

        for region in selected_regions:
            if region in regions_dict:
                region_dict = {}
                countries = regions_dict[region]
                for country in countries:
                    if country in df.columns:
                        total_price = df[country].sum()
                        region_dict[country] = total_price

                if region_dict and sum(region_dict.values()) > 0:
                    fig, ax = plt.subplots()
                    ax.pie(region_dict.values(), labels=region_dict.keys(), autopct='%1.1f%%', colors=plt.cm.Paired(range(len(region_dict))))
                    ax.axis('equal')
                    plt.title(f"Total Prices by Company in {region}")
                    image_path = os.path.join("uploads", f"{region}_pie_chart.png")
                    plt.savefig(image_path)
                    plt.close(fig)
                    images.append(os.path.basename(image_path))

        return images
    except Exception as e:
        logger.error(f"Error visualizing regions: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error visualizing regions: {str(e)}")

def visualize_total_prices_by_regions(file_path):
    if not os.path.exists(file_path):
        logger.error("File not found: %s", file_path)
        raise HTTPException(status_code=404, detail="File not found")

    try:
        df = pd.read_excel(file_path, sheet_name='Chargeback Raw Data', skiprows=4)
        regions_dict = get_regions_dict()

        region_totals = {}
        zero_price_regions = []

        for region, countries in regions_dict.items():
            total_price = 0
            for country in countries:
                if country in df.columns:
                    total_price += df[country].sum()
            if total_price > 0:
                region_totals[region] = total_price
            else:
                zero_price_regions.append(region)

        if region_totals:
            fig, ax = plt.subplots()
            ax.pie(region_totals.values(), labels=region_totals.keys(), autopct='%1.1f%%', colors=plt.cm.Paired(range(len(region_totals))))
            ax.axis('equal')
            plt.title("Total Prices by Regions")

            image_path = os.path.join("uploads", "region_pie_chart.png")
            plt.savefig(image_path)
            plt.close(fig)

            return os.path.basename(image_path), zero_price_regions
        return None, zero_price_regions
    except Exception as e:
        logger.error(f"Error visualizing regions: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error visualizing regions: {str(e)}")

