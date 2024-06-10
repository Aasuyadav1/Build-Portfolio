import { dbConnect } from "@/lib/dbConnect";
import Portfolio from "@/Models/portfolioModel";
import { NextResponse, NextRequest } from "next/server";

// for get userid by domain
export const GET = async (req: NextRequest, { params }: any) => {
  try {
    const domain = params?.domain;

    if (!domain) {
      return new NextResponse("domain not provided", { status: 400 });
    }

    await dbConnect();

    const userDomain = await Portfolio.find(
      { domain: domain },
      {
        userid: 1,
        _id: 0,
        domain: 0,
      }
    );

    if (!userDomain) {
      return new NextResponse("User not added links", { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "domain fetched successfully",
      data: userDomain,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

// for add domain
export const POST = async (req: NextRequest, { params }: any) => {
  try {
    const userid = params?.domain;

    if (!userid) {
      return new NextResponse("user id not provided", { status: 400 });
    }

    const { domain } = await req.json();

    if (!domain) {
      return new NextResponse("domain not provided", { status: 400 });
    }

    await dbConnect();

    const isExistsDomain = await Portfolio.find({ domain: domain });

    if (isExistsDomain) {
      return new NextResponse("domain already exists", { status: 400 });
    }

    const createDomain = await Portfolio.create({
      userid: userid,
      domain: domain,
    });

    if (!createDomain) {
      return new NextResponse("domain not created", { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "domain created successfully",
      data: createDomain,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

// for update domain
export const PUT = async (req: NextRequest, { params }: any) => {
  try {
    const userid = params?.domain;

    if (!userid) {
      return new NextResponse("user id not provided", { status: 400 });
    }

    const { domain } = await req.json();

    if (!domain) {
      return new NextResponse("domain not provided", { status: 400 });
    }

    await dbConnect();

    const isExistsDomain = await Portfolio.find({ domain: domain });

    if (isExistsDomain) {
      return new NextResponse("domain already exists", { status: 400 });
    }

    const updateDomain = await Portfolio.findOneAndUpdate(
      { userid: userid },
      {
        $set: {
          domain: domain,
        },
      }
    );

    if (!updateDomain) {
      return new NextResponse("domain not updated", { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "domain updated successfully",
      data: updateDomain,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
