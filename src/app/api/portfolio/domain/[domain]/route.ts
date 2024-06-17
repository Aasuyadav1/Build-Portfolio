import { dbConnect } from "@/lib/dbConnect";
import Portfolio from "@/Models/portfolioModel";
import { NextResponse, NextRequest } from "next/server";

// for get userid by domain
export const GET = async (req: NextRequest, { params }: any) => {
  try {
    const domain = params?.domain;

    

    if (!domain) {
      return new NextResponse("Domain not provided", { status: 400 });
    }

    await dbConnect();


    console.log("Domain:", domain);
    const userDomain = await Portfolio.findOne(
      { userid: domain },
      {
        userid: 1,
        domain: 1,
        _id: 0,
      }
    );

    console.log("userDomain:", userDomain);

    if (!userDomain) {
      return new NextResponse("User not published", { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Domain fetched successfully",
      data: userDomain, // Return the first matching document
    });
  } catch (error) {
    console.error("Internal Server Error:", error); // Enhanced logging
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

// for add domain
export const POST = async (req: NextRequest, { params }: any) => {
  try {

    const userid = params?.domain;

    if (!userid) {
      return NextResponse.json({
        message: "userid not provided",
        success: false
      });
    }

    await dbConnect();

    const isAlredyProvided = await Portfolio.findOne({ userid: userid });

    if(isAlredyProvided){
      return NextResponse.json({
        message: "Portfolio already published",
        success: false
      })
    }

    const { domain } = await req.json();

    if (!domain) {
      return NextResponse.json({
        message: "domain not provided",
        success: false,
      })
    }
  

    const isExistsDomain = await Portfolio.findOne({ domain: domain });

    if (isExistsDomain) {
      console.log('this domain already exists', isExistsDomain);
      return NextResponse.json({
        message: "Domain already exists",
        success: false,
      });
    }

    const createDomain = await Portfolio.create({
      userid: userid,
      domain: domain,
    });

    if (!createDomain) {
      return NextResponse.json({
        message: "domain not created",
        success: false,
      });
    }

    return NextResponse.json({
      success: true,
      message: "domain created successfully",
      data: createDomain,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Internal Server Error",
    });
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
