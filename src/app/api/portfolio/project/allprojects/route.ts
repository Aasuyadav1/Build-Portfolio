import { dbConnect } from "@/lib/dbConnect";
import Project from "@/Models/projectModel";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        const userid = "dd"

        await dbConnect()

        const projects = await Project.find({
            userid: userid
        })

        if(!projects) return new NextResponse("Failed to get projects", {status: 500})

        return NextResponse.json({
            success: true, message: 'projects fetched successfully', data: projects
        })
        
    } catch (error) {
        console.log(error)
    }
}