import { NextResponse, NextRequest } from "next/server"
import Skill from "../../../../../Models/skillModel"
import { dbConnect } from "../../../../../lib/dbConnect"

export const PUT = async (req: NextRequest, ) => {
    try {
       const id = req.nextUrl.searchParams.get("id")
       
       if(!id){
        return new NextResponse("Missing id", {status: 400})
       }

       const {skillname, skillimage} = await req.json()

       if(!skillname || !skillimage){
        return new NextResponse("Missing fields", {status: 400})
       }

       await dbConnect()

       const updateSkill = await Skill.findByIdAndUpdate(id, {
        $set: {
            skills: [
                {
                    skillname,
                    skillimage
                }
            ]
        }
       })
    } catch (error) {
        console.log(error)
    }
}

export const DELETE = async (req: NextRequest, {params}: any) => {
    try {
       const id = params.id
       
       if(!id){
        return new NextResponse("Missing id", {status: 400})
       }

       await dbConnect()

    await Skill.findByIdAndDelete(id)

       return new NextResponse("deleted successfully", {status: 200})
    } catch (error) {
        console.log(error)
    }
}