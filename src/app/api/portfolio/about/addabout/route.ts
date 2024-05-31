import { dbConnect } from "@/lib/dbConnect";
import About from "@/Models/aboutModel";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        
        const { about, image} = await req.json()

        if(!about || !image){
            return new NextResponse("Missing fields", {status: 400})
        }

        await dbConnect()

        const newAbout = await About.create({
            about: [
                {
                    about,
                    image
                }
            ]
        })

        if(!newAbout){
            return new NextResponse("Failed to add about", {status: 500})
        }

        return NextResponse.json({
            success: true, message: 'about added successfully', data: newAbout })

    } catch (error) {
        console.log(error)
    }
}