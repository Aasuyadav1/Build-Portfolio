import { dbConnect } from "@/lib/dbConnect";
import Link from "@/Models/linkModel"
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest, {params}: any) => {
    try {
        const userid = params.id

        await dbConnect()

        const links = await Link.find({
            userid: userid
        })

        if(!links) return new NextResponse("Failed to get links", {status: 500})

        return NextResponse.json({
            success: true, message: 'links fetched successfully', data: links
        })
        
    } catch (error) {
        console.log(error)
    }
}