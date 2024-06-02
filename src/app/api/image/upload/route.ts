import { NextResponse, NextRequest } from "next/server";
import formidable from 'formidable';
import fs from 'fs';
import uploadToCloudinary from "@/utils/cloudinary";

export const config = {
    api: {
      bodyParser: false,
    },
  };

export const POST = async (req: NextRequest) => {
    const form = new formidable.IncomingForm();

  form.parse(req, async (err : any, fields : any, files : any) => {
    if (err) {
      return new NextResponse('Error uploading the file', { status: 500 });
    }

    const file = files.file as formidable.File;
    const path = file.filepath;

    try {
      // Upload the file to Cloudinary
      const imageUrl = await uploadToCloudinary(path, 'your_folder_name');

      // Delete the local file after upload
      fs.unlinkSync(path);

      return new NextResponse(imageUrl, { status: 200 });
    } catch (error) {
      console.error(error);
      return new NextResponse('Error uploading the file', { status: 500 });
    }
  });
}