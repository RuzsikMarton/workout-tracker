const PageTitle = ({ title }: { title: string }) => {
  return (
    <div className="block py-8 lg:py-16 bg-title">
      <div className="w-4/5 mx-auto lg:max-w-5xl">
        <span className="text-white uppercase text-4xl lg:text-5xl font-medium font-stretch-50% underline underline-offset-4 decoration-red-700">
          {title}
        </span>
      </div>
    </div>
  );
};

export default PageTitle;
