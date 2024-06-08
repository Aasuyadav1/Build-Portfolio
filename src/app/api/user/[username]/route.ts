import { dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import User from "@/Models/userModel";

export const GET = async (req: NextRequest, { params }: any) => {
  try {
    const name = params.username;

    await dbConnect();

    const isUser = await User.findOne({
      name: name,
    });

    if (!isUser) {
      return new NextResponse("User not found try again", { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: "User fetched successfully",
      data: isUser._id,
    });
  } catch (error) {
    console.log(error);
  }
};
