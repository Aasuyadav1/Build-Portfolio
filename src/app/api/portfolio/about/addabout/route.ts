import { dbConnect } from "@/lib/dbConnect";
import About from "@/Models/aboutModel";
import { NextRequest, NextResponse } from "next/server";
import { aboutValidation } from "@/Schema/aboutValidation";

export const POST = async (req: NextRequest) => {
  try {
    // Parse and validate the incoming data using Zod
    const json = await req.json();
    const parseResult = aboutValidation.safeParse(json);

    if (!parseResult.success) {
      console.log(parseResult.error);
      return new NextResponse("Invalid data", { status: 400 });
    }

    const { name, image, about, heading } = parseResult.data;

    // Check if required fields are present
    if (!name || !about || !heading) {
      return new NextResponse("Missing fields", { status: 400 });
    }


    await dbConnect();

    const newAbout = await About.create({
      userid: json.userid, // Ensure this matches your schema
      name,
      heading,
      about,
      // image: data.result.secure_url,
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
