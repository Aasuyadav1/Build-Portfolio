import { dbConnect } from "@/lib/dbConnect";
import About from "@/Models/aboutModel";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    // Parse and validate the incoming data using Zod
    const { name, image, about, heading, userid } = await req.json();
   

    // Check if required fields are present
    if (!name || !about || !heading) {
      return new NextResponse("Missing fields", { status: 400 });
    }


    await dbConnect();

    const newAbout = await About.create({
      userid: userid, // Ensure this matches your schema
      name,
      heading,
      about,
      image,
    });

    if (!newAbout) {
      return new NextResponse("Failed to add about", { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: "About added successfully",
      data: newAbout,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Server error", { status: 500 });
  }
};
