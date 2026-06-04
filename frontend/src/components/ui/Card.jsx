const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;