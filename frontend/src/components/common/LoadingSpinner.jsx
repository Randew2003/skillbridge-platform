const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center">
      <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />

      <p className="mt-4 text-sm font-medium text-slate-500">{message}</p>
    </div>
  );
};

export default LoadingSpinner;