import { dbConnect } from "@/lib/dbConnect";
import Link from "@/Models/linkModel";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        
        const { linkname, linkimage} = await req.json()

        if(!linkname || !linkimage){
            return new NextResponse("Missing fields", {status: 400})
        }

        await dbConnect()

        const newLink = await Link.create({
            links: [
                {
                    linkname,
                    linkimage
                }
            ]
        })

        if(!newLink){
            return new NextResponse("Failed to add link", {status: 500})
        }

        return NextResponse.json({
            success: true, message: 'link added successfully', data: newLink })

    } catch (error) {
        console.log(error)
    }
}