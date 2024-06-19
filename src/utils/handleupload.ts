import { cloudinary } from "./cloudinary";
import { NextRequest } from "next/server";
import { UploadApiResponse, UploadApiErrorResponse } from "cloudinary";

type UploadResponse = 
  { success: true; result?: UploadApiResponse } | 
  { success: false; error: UploadApiErrorResponse };

const uploadToCloudinary = (
  fileUri: string, fileName: string): Promise<UploadResponse> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload(fileUri, {
        invalidate: true,
        resource_type: "auto",
        filename_override: fileName,
        folder: "myPortfolio", // any sub-folder name in your cloud
        use_filename: true,
      })
      .then((result) => {
        resolve({ success: true, result });
      })
      .catch((error) => {
        resolve({ success: false, error });
      });
  });
};

const extractPublicIdFromUrl = (url: string): string => {
  const urlParts = url.split('/');
  const publicIdWithExtension = urlParts[urlParts.length - 1];
  const [publicId] = publicIdWithExtension.split('.');
  return publicId;
};

const deleteFromCloudinary = (url: string): Promise<UploadResponse> => {
  return new Promise((resolve, reject) => {
    const publicId = extractPublicIdFromUrl(url);

    cloudinary.uploader
      .destroy(publicId)
      .then((result) => {
        resolve({ success: true, result });
      })
      .catch((error) => {
        resolve({ success: false, error });
      });
  });
};

export {
  uploadToCloudinary,
  deleteFromCloudinary
};
