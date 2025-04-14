import { cn } from "@/lib/utils";
import { JobCard } from "@/components/JobCard";
import { useEffect, useState } from "react";
import { getJobList } from "@/helpers/userHttpHelper";
import { Job } from "@/interfaces/Job";

function CarouselCard({
  className,
  companyName,
}: {
  className?: string;
  companyName: string;
}) {
  const [openings, setOpenings] = useState<Array<Job>>([]);
  useEffect(() => {
    const fetchOpenings = async () => {
      try {
        const { jobList } = await getJobList(`company=${companyName}`);
        setOpenings(jobList);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOpenings();
  }, [companyName]);

  return (
    <div
      className={cn(
        "relative rounded-md overflow-hidden border py-4",
        className
      )}
      style={{
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url('assets/crousal-background.jpg')`,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      />
      <div className="relative flex gap-4 items-center">
        <div
          className="w-10 h-10 relative rounded-full overflow-hidden shadow-md bg-white"
          style={{
            backgroundImage: `url('assets/${companyName.toLowerCase()}.png')`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        ></div>
        <h1 className="text-lg font-bold md:text-2xl capitalize text-white">
          {companyName}
        </h1>
      </div>
      <div className="relative flex flex-col w-full justify-evenly h-full gap-2 overflow-y-scroll p-3 mb-2">
        {openings.map((opening, idx) => {
          return <JobCard isCraousalJob={true} key={idx} job={opening} />;
        })}
      </div>
    </div>
  );
}

export default CarouselCard;
