const Card = ({ children, title, className = '', noPadding = false }) => {
  return (
    <div className={`bg-slate-800 rounded-2xl border border-slate-700 ${noPadding ? '' : 'p-8'} ${className}`}>
      {title && (
        <h3 className="text-2xl font-bold mb-6 text-white">{title}</h3>
      )}
      {children}
    </div>
  );
};

export default Card;
