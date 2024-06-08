import { dbConnect } from "@/lib/dbConnect";
import Skill from "@/Models/skillModel";
import { NextResponse } from "next/server";

export const GET = async ({params} : any) => {
    try {

        await dbConnect()

        const userid = params?.id

        const skills = await Skill.find({
            userid: userid
        })
        
        return NextResponse.json(skills)
    } catch (error) {
        console.log(error)
    }
}