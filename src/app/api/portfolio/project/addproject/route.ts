import { dbConnect } from "@/lib/dbConnect";
import Project from "@/Models/projectModel";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const { projectname, description, skills, githublink, projectlink, image } : any = req.json()

        if(!projectname || !description || !skills || !githublink || !projectlink || !image){
            return new NextResponse("Missing fields", {status: 400})
        }

        await dbConnect()

        const newProject = await Project.create({
            projects: [
                {
                    projectname,
                    description,
                    skills,
                    githublink,
                    projectlink,
                    image
                }
            ]
        })

        if(!newProject){
            return new NextResponse( "Failed to add project", {status: 500})
        }

        return NextResponse.json({
            success: true, message: 'project added successfully', data: newProject
        })
        

    } catch (error) {
        console.log(error)
    }
}