const StyleContainer = ({
  title,
  value,
  showTitle,
}: {
  title: string;
  value: string;
  showTitle: boolean;
}) => {
  return (
    <div>
      {showTitle && <p className="mb-2 md:font-semibold capitalize">{title}</p>}
      <p className="border capitalize bg-gray-200 rounded-sm w-auto p-1 px-2 dark:bg-accent">
        {value}
      </p>
    </div>
  );
};

export default StyleContainer;
