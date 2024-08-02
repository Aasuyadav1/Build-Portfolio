import PortfolioLinks from "./PortfolioLinks";
import Image from "next/image";

const PortfolioAbout = ({ aboutDatas, allLinks }: {
  aboutDatas: any;
  allLinks: any;
}) => {
  return (
    <section id="about" className=" w-full h-full">
      <div className="w-full h-full mt-2 py-6 px-2 flex flex-col justify-center items-center border-2 border-solid ">
       {
         aboutDatas[0]?.image && 
          <div className="flex justify-center object-cover items-center w-full max-w-[180px]  md:max-w-[200px] aspect-square p-1 overflow-hidden rounded-full border-solid border-4 border-portfolioSecondary">
          <Image
            className="rounded-full object-cover w-full h-full"
            src={aboutDatas[0]?.image}
            alt="user's image"
            width={200}
            height={200}
            layout="responsive"
            quality={100}
            title="user image"
          />
        </div>
       }
        <div className="text-center mt-4 ">
          <h3 className="">
            <span className="font-semibold text-base md:text-xl">My Self,</span>{" "}
            <span className="text-portfolioSecondary md:text-4xl text-3xl font-bold">
              {aboutDatas[0]?.name}
            </span>
          </h3>
          <h1 className="text-xl mt-[1px] md:text-2xl  font-bold">
            {aboutDatas[0]?.heading}
          </h1>
          <div className="max-w-[550px] mt-[1px] text-pretty ">
          <p className="md:text-lg text-center  text-base ">
            {aboutDatas[0]?.about}
          </p>
          </div>
        </div>
        <PortfolioLinks allLinks={allLinks} />
      </div>
    </section>
  );
};

export default PortfolioAbout;
