const PageTitle = ({ title, date }: { title: string; date?: Date }) => {
  return (
    <div className="block py-8 lg:py-16 bg-header-bg">
      <div className="w-4/5 mx-auto lg:max-w-7xl">
        <span className="text-white uppercase text-4xl lg:text-5xl font-medium font-stretch-50% underline underline-offset-4 decoration-red-700">
          {title}
        </span>
        {date && (
          <p className="text-muted-foreground text-lg mt-2">
            {date.toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
};

export default PageTitle;
