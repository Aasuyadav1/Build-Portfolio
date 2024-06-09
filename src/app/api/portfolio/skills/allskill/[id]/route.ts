import { dbConnect } from "@/lib/dbConnect";
import Skill from "@/Models/skillModel";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest,{params} : any) => {
    try {

        await dbConnect()

        const userid = params?.id

        const skills = await Skill.find({
            userid: userid
        })
        
        return NextResponse.json({
            success: true,
            message: "skills fetched successfully",
            data: skills
        })
    } catch (error) {
        console.log(error)
    }
}