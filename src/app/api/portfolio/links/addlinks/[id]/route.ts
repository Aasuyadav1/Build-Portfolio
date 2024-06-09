import { dbConnect } from "@/lib/dbConnect";
import Link from "@/Models/linkModel";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, {params} : any) => {
    try {
        
        const { label, link} = await req.json()

        const id = params?.id

        if(!label || !link){
            return new NextResponse("Missing fields", {status: 400})
        }

        await dbConnect()

        const newLink = await Link.create({
            userid: id,
            label,
            link
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