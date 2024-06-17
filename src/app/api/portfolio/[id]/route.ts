import { dbConnect } from "@/lib/dbConnect";
import { NextResponse, NextRequest } from "next/server";
import Portfolio from "@/Models/portfolioModel";
import mongoose from "mongoose";

export const GET = async (req: NextRequest, { params }: any) => {
  try {
    const { id } = params;

    await dbConnect();

    const findPortfolio = await Portfolio.findOne({ domain: id });

    if (!findPortfolio) {
      return NextResponse.json({
        success: false,
        message: "Portfolio not found",
      });
    }

    console.log("Portfolio found:", findPortfolio);

    if (!findPortfolio?.userid || !mongoose.Types.ObjectId.isValid(findPortfolio?.userid)) {
      console.log("Invalid or missing ID");
      return NextResponse.json({
        success: false,
        message: "Invalid or missing ID",
      });
    }


    const userIdObject = new mongoose.Types.ObjectId(findPortfolio?.userid);
    console.log("UserId Object:", userIdObject);


    const aggregatePipeline = [
      {
        $match: {
          userid: userIdObject,
        },
      },
      {
        $lookup: {
          from: "abouts",
          localField: "userid",
          foreignField: "userid",
          as: "about",
        },
      },
      {
        $lookup: {
          from: "links",
          localField: "userid",
          foreignField: "userid",
          as: "links",
        },
      },
      {
        $lookup: {
          from: "skills",
          localField: "userid",
          foreignField: "userid",
          as: "skills",
        },
      },
      {
        $lookup: {
          from: "projects",
          localField: "userid",
          foreignField: "userid",
          as: "projects",
        },
      },
      {
        $project: {
          _id: 1,
          about: 1,
          links: 1,
          skills: 1,
          projects: 1,
        },
      },
    ];

    const portfolio = await Portfolio.aggregate(aggregatePipeline);

    if (!portfolio || portfolio.length === 0) {
      console.log("No portfolio found for the provided userid after aggregation");
      return new NextResponse("Portfolio not found", { status: 404 });
    }

    console.log("Portfolio fetched successfully:", portfolio);

    return NextResponse.json({
      success: true,
      message: "Portfolio fetched successfully",
      data: portfolio[0],
    });
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    return new NextResponse("Server error", { status: 500 });
  }
};
