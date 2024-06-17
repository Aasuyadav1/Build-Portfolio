import { dbConnect } from "@/lib/dbConnect";
import About from "@/Models/aboutModel";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest, { params }: any) => {
  try {
    const id = params.id;

    await dbConnect();

    const about = await About.findById(id);

    if (!about) return new NextResponse("Failed to get about", { status: 500 });

    return NextResponse.json({
      success: true,
      message: 'About fetched successfully',
      data: about,
    });
  } catch (error) {
    console.log(error);
  }
};

export const DELETE = async (req: NextRequest, { params }: any) => {
  try {
    const id = params.id;

    await dbConnect();

    const deleteAbout = await About.findByIdAndDelete(id);

    if (!deleteAbout) return new NextResponse("Failed to delete about", { status: 500 });

    return new NextResponse("About deleted successfully", { status: 200 });
  } catch (error) {
    console.log(error);
  }
};

export const PUT = async (req: NextRequest, { params }: any) => {
  try {
    const id = params.id;

    const { heading, about, name, image } = await req.json();

    await dbConnect();

    const updateAbout = await About.findByIdAndUpdate(id, {
      $set: {
        name,
        heading,
        about,
        image,  // Assuming image is a part of the schema
      },
    });

    if (!updateAbout) return new NextResponse("Failed to update about", { status: 500 });

    return new NextResponse("About updated successfully", { status: 200 });

  } catch (error) {
    console.log(error);
    return new NextResponse("Server error", { status: 500 });
  }
};
