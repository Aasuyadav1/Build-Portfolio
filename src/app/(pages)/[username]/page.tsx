"use client";
import React, { useEffect, useState } from "react";
import PortfolioAbout from "../../../components/portfolio/PortfolioAbout";
import SkillsSection from "@/components/portfolio/PortfolioSkills";
import PortfolioProjectCard from "@/components/portfolio/PortfolioProjectCard";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

const Page = ({ params }: any) => {
  const [portfolioData, setPortfolioData] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  const fetchPortfolio = async () => {
    try {
      const response = await fetch("/api/portfolio/" + params?.username, {
        method: "GET",
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setPortfolioData(data.data);
        setIsLoading(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("error on fetching the user ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center w-full h-screen">
          <span className="loader2"></span>
        </div>
      ) : (
        portfolioData && (
          <section className="flex scroll-smooth  flex-col gap-10 py-2 px-2">
            <PortfolioAbout
              aboutDatas={portfolioData?.about}
              allLinks={portfolioData?.links}
            />
            <SkillsSection skillData={portfolioData?.skills} />
            <PortfolioProjectCard
              projectData={portfolioData?.projects}
            />
            {/* <PortfolioContact/>
            <SingleShare/> */}
          </section>
        )
      )}
    </>
  );
};

export default Page;
