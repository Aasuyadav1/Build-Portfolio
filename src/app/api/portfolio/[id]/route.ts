import { dbConnect } from "@/lib/dbConnect";
import { NextResponse, NextRequest } from "next/server";
import Portfolio from "@/Models/portfolioModel";

export const GET = async (req: NextRequest, { params }: any) => {
    try {
        const id = params.id;

        if(!id) return new NextResponse("Failed to get project", {status: 500})

        await dbConnect();

        const aggregatePipeline = [
            {
                $match: {
                    userid: id
                }
            },
            {
                $lookup: {
                    from: "abouts",
                    localField: "userid",
                    foreignField: "userid",
                    as: "about"
                }
            },
            {
                $lookup: {
                    from: "links",
                    localField: "userid",
                    foreignField: "userid",
                    as: "links"
                }
            },
            {
                $lookup: {
                    from: "skills",
                    localField: "userid",
                    foreignField: "userid",
                    as: "skills"
                }
            },
            {
                $lookup: {
                    from: "projects",
                    localField: "userid",
                    foreignField: "userid",
                    as: "projects"
                }
            },
        ]

        const portfolio = await Portfolio.aggregate(aggregatePipeline);

        if (!portfolio) return new NextResponse("Failed to get portfolio", { status: 500 });

        console.log(portfolio);

        return NextResponse.json({ success: true, message: 'Portfolio fetched successfully', data: portfolio[0] });
    } catch (error) {
        console.log(error);
    }
}