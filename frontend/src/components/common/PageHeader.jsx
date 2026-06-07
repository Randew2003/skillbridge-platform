const PageHeader = ({ title, description, action }) => {
  return (
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">{title}</h1>

        {description && (
          <p className="mt-2 text-slate-500">{description}</p>
        )}
      </div>

      {action && <div>{action}</div>}
    </div>
  );
};

export default PageHeader;