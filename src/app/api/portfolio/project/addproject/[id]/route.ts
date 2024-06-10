import { dbConnect } from "@/lib/dbConnect";
import Project from "@/Models/projectModel";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, {params}:any) => {
    try {
         
        const userid = params.id

        const { title, description, github, image, link, technologies } : any = await req.json()

        if(!title || !description || !github || !image || !link || !technologies) {
            
            return new NextResponse("Missing fields", {status: 400})
           
        }

        await dbConnect()

        const newProject = await Project.create({
            userid,
            title,
            description,
            github,
            image,
            link,
            technologies
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