import PortfolioAbout from "../../../components/portfolio/PortfolioAbout";
import SkillsSection from "@/components/portfolio/PortfolioSkills";
import PortfolioProjectCard from "@/components/portfolio/PortfolioProjectCard";
import Portfolio from "@/Models/portfolioModel";
import { redirect } from "next/navigation";
import { dbConnect } from "@/lib/dbConnect";
import mongoose from "mongoose";

const Page = async ({ params }: {
  params: { username: string };
}) => {

  await dbConnect();

  const findPortfolio = await Portfolio.findOne({ domain: params.username });

  if (!findPortfolio) {
    redirect('/')
  }

  if (!findPortfolio?.userid || !mongoose.Types.ObjectId.isValid(findPortfolio?.userid)) {
    redirect('/')
  }

  const userIdObject = new mongoose.Types.ObjectId(findPortfolio?.userid);

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

  const portfolioData: any = await Portfolio.aggregate(aggregatePipeline);

  console.log(portfolioData)

  if (!portfolioData) {
    redirect('/')
  }

  return (
    <section className="scroll-smooth!" style={{ scrollBehavior: "smooth" }}>
      {
        portfolioData && (
          <section className="flex scroll-smooth  flex-col gap-10 py-2 px-2">
            {
              portfolioData[0]?.about && portfolioData[0]?.about.length > 0 ? <PortfolioAbout
                aboutDatas={portfolioData[0]?.about}
                allLinks={portfolioData[0]?.links}
              /> : null
            }
            {
              portfolioData[0]?.skills && portfolioData[0]?.skills.length > 0 ? <SkillsSection skillData={portfolioData[0]?.skills} /> : null
            }
            {
              portfolioData[0]?.projects && portfolioData[0]?.projects.length > 0 ? <PortfolioProjectCard
                projectData={portfolioData[0]?.projects}
              /> : null
            }
            {/* <PortfolioContact/>
            <SingleShare/> */}
          </section>
        )
      }
    </section>
  );
};

export default Page;
