import { dbConnect } from "@/lib/dbConnect";
import Skill from "@/Models/skillModel";
import { NextRequest, NextResponse } from "next/server";
import User from "@/Models/userModel";

export const POST = async (req: NextRequest) => {
    try {
        
        const { skillname, skillimage} = await req.json()

        if(!skillname || !skillimage){
            return new NextResponse("Missing fields", {status: 400})
        }

        await dbConnect()

        const newSkill = Skill.create({
            skills: [
                {
                    skillname,
                    skillimage
                }
            ]
        })

        if(!newSkill) return new NextResponse("Failed to add skill", {status: 500})

        return NextResponse.json({
            success: true, message: 'skill added successfully', data: newSkill})

    } catch (error) {
        console.log(error)
    }
}