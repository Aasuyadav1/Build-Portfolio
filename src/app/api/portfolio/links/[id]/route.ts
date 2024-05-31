import { dbConnect } from "@/lib/dbConnect";
import Link from "@/Models/linkModel";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";


export const DELETE = async (req: NextRequest, { params }: any) => {
    try {
        const id = params.id

        await dbConnect()

        const deleteLink = await Link.findByIdAndDelete(id)

        if(!deleteLink) return new NextResponse("Failed to delete link", {status: 500})

        return new NextResponse("Link deleted successfully", {status: 200})
    } catch (error) {
        console.log(error)
    }
}

