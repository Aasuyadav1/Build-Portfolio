import { dbConnect } from "@/lib/dbConnect";
import Skill from "@/Models/skillModel";
import { NextRequest, NextResponse } from "next/server";
import User from "@/Models/userModel";

export const POST = async (req: NextRequest, { params }: any) => {
  try {
    const userid = params.id;

    const { label, value } = await req.json();

    if (!label || !value) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    await dbConnect();

    const newSkill = await Skill.create({
      userid,
      label,
      value,
    });

    if (!newSkill)
      return new NextResponse("Failed to add skill", { status: 500 });

    return NextResponse.json({
      success: true,
      message: "skill added successfully",
      data: newSkill,
    });
  } catch (error) {
    console.log(error);
  }
};
