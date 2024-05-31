import { dbConnect } from "@/lib/dbConnect";
import About from "@/Models/aboutModel";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest, { params }: any) => {
    try {
        const id = params.id

        await dbConnect()

        const about = await About.findById(id)

        if(!about) return new NextResponse("Failed to get about", {status: 500})

        return NextResponse.json({
            success: true, message: 'about fetched successfully', data: about})
    } catch (error) {
        console.log(error)
    }
}

export const DELETE = async (req: NextRequest, { params }: any) => {
    try {
        const id = params.id

        await dbConnect()

        const deleteAbout = await About.findByIdAndDelete(id)

        if(!deleteAbout) return new NextResponse("Failed to delete about", {status: 500})

        return new NextResponse("About deleted successfully", {status: 200})
    } catch (error) {
        console.log(error)
    }
}

export const PUT = async (req: NextRequest, { params }: any) => {
    try {
        const id = params.id

        const { about, image } = await req.json()

        if(!about || !image){
            return new NextResponse("Missing fields", {status: 400})
        }

        await dbConnect()

        const updateAbout = await About.findByIdAndUpdate(id, {
            $set: {
                about,
                image
            }
        })

        return new NextResponse("About updated successfully", {status: 200})
        
    } catch (error) {
        console.log(error)
    }
}