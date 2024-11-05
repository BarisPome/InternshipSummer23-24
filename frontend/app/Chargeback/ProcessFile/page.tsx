

"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const ProcessFile = () => {
  const searchParams = useSearchParams();
  const fileName = searchParams.get("fileName");

  const [message, setMessage] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [regionImage, setRegionImage] = useState<string>(""); // State for region pie chart
  const [processedFileName, setProcessedFileName] = useState<string>("");
  const [subsidiariesFileName, setSubsidiariesFileName] = useState<string>(""); // State for subsidiaries Excel file
  const [availableRegions, setAvailableRegions] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [zeroPriceRegions, setZeroPriceRegions] = useState<string[]>([]); // Track regions with zero price

  const [vendorImage, setVendorImage] = useState<string>(""); // State for vendor pie chart
  const [availableVendors, setAvailableVendors] = useState<string[]>([]);
  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);

  useEffect(() => {
    const processFile = async () => {
      if (!fileName) {
        setMessage("No file name provided");
        return;
      }

      try {
        // Process the file and get the processed file name
        const res = await fetch(
          `http://127.0.0.1:8000/api/chargeback/process?fileName=${fileName}`
        );
        const data = await res.json();
        if (res.ok) {
          setMessage("File processed successfully");
          setProcessedFileName(data.fileName);

          // Fetch the subsidiaries Excel file
          const resSubsidiaries = await fetch(
            `http://127.0.0.1:8000/api/chargeback/create_subsidiaries?fileName=${fileName}`
          );
          const dataSubsidiaries = await resSubsidiaries.json();
          if (resSubsidiaries.ok) {
            setSubsidiariesFileName(dataSubsidiaries.subsidiariesFileName);
          } else {
            setMessage(
              `Error: ${dataSubsidiaries.detail || "Creating subsidiaries Excel failed"}`
            );
          }

          // Fetch total prices by regions pie chart
          const resRegionImage = await fetch(
            `http://127.0.0.1:8000/api/chargeback/region_image?fileName=${fileName}`
          );
          const dataRegionImage = await resRegionImage.json();
          if (resRegionImage.ok && dataRegionImage.image) {
            setRegionImage(dataRegionImage.image);
            setZeroPriceRegions(dataRegionImage.zeroPriceRegions); // Capture zero price regions
          } else {
            setMessage(
              `Error: ${dataRegionImage.detail || "Fetching region image failed"}`
            );
          }

          // Fetch available regions, filtered by backend
          const resRegions = await fetch(
            `http://127.0.0.1:8000/api/chargeback/available_regions?fileName=${fileName}`
          );
          const dataRegions = await resRegions.json();
          if (resRegions.ok) {
            setAvailableRegions(dataRegions.regions);
          } else {
            setMessage(
              `Error: ${dataRegions.detail || "Fetching regions failed"}`
            );
          }

          // Fetch available vendors and their pie chart
          const resVendorImage = await fetch(
            `http://127.0.0.1:8000/api/chargeback/vendor_image?fileName=${fileName}`
          );
          const dataVendorImage = await resVendorImage.json();
          if (resVendorImage.ok && dataVendorImage.image) {
            setVendorImage(dataVendorImage.image);
          } else {
            setMessage(
              `Error: ${dataVendorImage.detail || "Fetching vendor image failed"}`
            );
          }

          // Fetch available vendors, filtered by backend
          const resVendors = await fetch(
            `http://127.0.0.1:8000/api/chargeback/available_vendors?fileName=${fileName}`
          );
          const dataVendors = await resVendors.json();
          if (resVendors.ok) {
            setAvailableVendors(dataVendors.vendors);
          } else {
            setMessage(
              `Error: ${dataVendors.detail || "Fetching vendors failed"}`
            );
          }
        } else {
          setMessage(`Error: ${data.detail || "Processing failed"}`);
        }
      } catch (error) {
        setMessage(`Error: ${(error as Error).message}`);
      }
    };

    processFile();
  }, [fileName]);

  const handleRegionSelection = (region: string) => {
    if (zeroPriceRegions.includes(region)) {
      setMessage(`The price for the region "${region}" is zero`);
    } else {
      setSelectedRegions((prev) =>
        prev.includes(region)
          ? prev.filter((r) => r !== region)
          : [...prev, region]
      );
    }
  };

  const handleVendorSelection = (vendor: string) => {
    setSelectedVendors((prev) =>
      prev.includes(vendor)
        ? prev.filter((v) => v !== vendor)
        : [...prev, vendor]
    );
  };

  const handleVisualize = async () => {
    if (!selectedRegions.length && !selectedVendors.length) {
      setMessage("No regions or vendors selected for visualization");
      return;
    }

    try {
      const resImages = await fetch(
        `http://127.0.0.1:8000/api/chargeback/visualize?fileName=${fileName}&selected_regions=${selectedRegions.join(
          ","
        )}&selected_vendors=${selectedVendors.join(",")}`
      );
      const dataImages = await resImages.json();
      if (resImages.ok) {
        setImages(dataImages.images);
      } else {
        setMessage(`Error: ${dataImages.detail || "Fetching images failed"}`);
      }
    } catch (error) {
      setMessage(`Error: ${(error as Error).message}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-5xl w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Data Insights Dashboard</h1>
          {processedFileName && (
            <a
              href={`http://127.0.0.1:8000/api/chargeback/download/${processedFileName}`}
              download
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Download Processed File
            </a>
          )}
        </div>

        {subsidiariesFileName && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Subsidiaries Excel</h2>
            <a
              href={`http://127.0.0.1:8000/api/chargeback/download/${subsidiariesFileName}`}
              download
              className="bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition duration-300"
            >
              Download Subsidiaries Excel File
            </a>
          </div>
        )}

        {message && (
          <div
            className={`p-4 mb-6 rounded-lg ${
              message.includes("Error")
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {message}
          </div>
        )}

        {regionImage && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">
              Total Prices by Regions
            </h2>
            <div className="flex justify-center">
              <img
                src={`http://127.0.0.1:8000/api/chargeback/visualize_image/${regionImage}`}
                alt="Total Prices by Regions"
                className="max-w-lg shadow-md rounded-lg"
              />
            </div>
          </div>
        )}

        {vendorImage && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">
              Total Prices by Vendors
            </h2>
            <div className="flex justify-center">
              <img
                src={`http://127.0.0.1:8000/api/chargeback/visualize_image/${vendorImage}`}
                alt="Total Prices by Vendors"
                className="max-w-lg shadow-md rounded-lg"
              />
            </div>
          </div>
        )}

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">
            Select Regions for Detailed Insights
          </h2>
          <div className="flex flex-wrap justify-start mb-4">
            {availableRegions.map((region, index) => (
              <button
                key={index}
                className={`p-2 m-2 border ${
                  selectedRegions.includes(region)
                    ? "border-blue-600 bg-blue-200"
                    : "border-gray-300"
                } rounded-lg hover:bg-gray-200 transition`}
                onClick={() => handleRegionSelection(region)}
              >
                {region}
              </button>
            ))}
          </div>

          <h2 className="text-xl font-semibold mb-2">
            Select Vendors for Detailed Insights
          </h2>
          <div className="flex flex-wrap justify-start mb-4">
            {availableVendors.map((vendor, index) => (
              <button
                key={index}
                className={`p-2 m-2 border ${
                  selectedVendors.includes(vendor)
                    ? "border-blue-600 bg-blue-200"
                    : "border-gray-300"
                } rounded-lg hover:bg-gray-200 transition`}
                onClick={() => handleVendorSelection(vendor)}
              >
                {vendor}
              </button>
            ))}
          </div>

          <button
            onClick={handleVisualize}
            className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Visualize Selected Regions and Vendors
          </button>
        </div>

        {images.length > 0 ? (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Data Insights</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 shadow-md rounded-lg"
                >
                  <img
                    src={`http://127.0.0.1:8000/api/chargeback/visualize_image/${image}`}
                    alt={`Pie chart ${index}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <p className="text-center mt-2">Chart {index + 1}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default ProcessFile;



