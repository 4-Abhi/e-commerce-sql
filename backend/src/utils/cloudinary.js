import { v2 as cloudinary } from "cloudinary";
import fs from 'fs'

cloudinary.config({
    cloud_name: process.env.CLUNDNAIRY_NAME,
    api_key: process.env.CLOUDNAIRY_API_KEY,
    api_secret: process.env.CLOUDNAIRY_API_SECRET, // Click 'View API Keys' above to copy your API secret
  })

export const uploadCloud = async (localFilepath) => {
  try {
    if (!localFilepath) return null;
    const response = await  cloudinary.uploader.upload(localFilepath , {
        fetch_format: "auto",
        resource_type: "auto",
        chunk_size: 7000000
    })  
    fs.unlinkSync(localFilepath)
    return response
  } catch (error) {
    console.log("EROR is" , error)
    fs.unlinkSync(localFilepath)
    return null;
  }
};

 
