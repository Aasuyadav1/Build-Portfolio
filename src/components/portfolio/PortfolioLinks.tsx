import { SocialIcon, getKeys } from "react-social-icons";

interface Props {
  allSkills: { network: string; url: string }[];
}


const PortfolioLinks = ({allLinks} : {
  allLinks: { network: string; url: string }[]
}) => {
  
  return (
    <section className="w-fit p-3 mt-3">
      <div className="mt-1 flex flex-wrap justify-center items-center w-fit gap-2">
      { allLinks && allLinks.map((skill : any) => (
        <SocialIcon 
          key={skill?.label}
          url={skill?.link}
          className="hover:scale-110 transition-all cursor-pointer"
          style={{ height: 40, width: 40 }}
          network={skill?.label?.toLowerCase()}
          target="_blank"
        />
      ))
    }
      </div>
    </section>
  );
};

export default PortfolioLinks;
