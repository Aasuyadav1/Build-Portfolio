import { dbConnect } from "@/lib/dbConnect";
import Link from "@/Models/linkModel";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest, { params }: any) => {
  try {
    const userid = params?.id;

    if (!userid) {
      return new NextResponse("User ID not provided", { status: 400 });
    }

    await dbConnect();

    const links = await Link.find({ userid: userid });

    if (!links) {
      return new NextResponse("User not added links", { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Links fetched successfully",
      data: links,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
