const JobSection = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className="">
      <h2 className="md:text-lg font-bold capitalize mt-6 mb-2">{title}</h2>
      <p className="text-justify text-sm">{value}</p>
    </div>
  );
};

export default JobSection;
