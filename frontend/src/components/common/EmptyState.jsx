const EmptyState = ({
  icon: Icon,
  title = "No data found",
  description = "There is nothing to show here yet.",
}) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center">
      {Icon && (
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
          <Icon size={26} />
        </div>
      )}

      <h2 className="text-xl font-bold text-slate-900">{title}</h2>

      <p className="mt-2 text-sm text-slate-500">{description}</p>
    </div>
  );
};

export default EmptyState;