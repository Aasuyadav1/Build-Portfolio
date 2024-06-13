import { dbConnect } from "@/lib/dbConnect";
import Project from "@/Models/projectModel";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest, { params }: any) => {
    try {
        const id = params.id

        await dbConnect()

        const project = await Project.findById(id)

        if(!project) return new NextResponse("Failed to get project", {status: 500})

        return NextResponse.json({
            success: true, message: 'project fetched successfully', data: project
        })
    } catch (error) {
        console.log(error)
    }
}

export const DELETE = async (req: NextRequest, { params }: any) => {
    try {
        const id = params.id

        await dbConnect()

       await Project.findByIdAndDelete(id)

       return new NextResponse("Project deleted successfully", {status: 200})
       
    } catch (error) {
        console.log(error)
    }
}

export const PUT = async (req: NextRequest, { params }: any) => {
    try {
        const id = params.id

        const { title, description, github, image, link, technologies } : any = await req.json()

        if(!title || !description || !github || !image || !link || !technologies) {
            
            return new NextResponse("Missing fields", {status: 400})
           
        }

        await dbConnect()

        const updateProject = await Project.findByIdAndUpdate(id, {
            $set: {
                title,
                description,
                github,
                image,
                link,
                technologies
            }
        })

        if(!updateProject) return new NextResponse("Failed to update project", {status: 500})

        return new NextResponse("Project updated successfully", {status: 200})
    } catch (error) {
        console.log(error)
    }
}