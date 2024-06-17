import { dbConnect } from "@/lib/dbConnect";
import About from "@/Models/aboutModel";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest, { params } : any) => {
    try {
        const userid = params?.id

        await dbConnect()

       const about = await About.find({
            userid: userid
        })

        if(!about) return new NextResponse("Failed to get about", {status: 500})

        return NextResponse.json({
            success: true, message: 'about fetched successfully', data: about
        })
        
    } catch (error) {
        console.log(error)
    }
}