import { dbConnect } from "@/lib/dbConnect";
import Skill from "@/Models/skillModel";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {

        await dbConnect()

        const userid = "641b0e1d7a9e3c4c0b0b0b0b"

        const skills = await Skill.find({
            userid: userid
        })
        
        return NextResponse.json(skills)
    } catch (error) {
        console.log(error)
    }
}