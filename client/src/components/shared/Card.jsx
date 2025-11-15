const Card = ({ children, title, className = '', noPadding = false }) => {
  return (
    <div className={`bg-white rounded-xl shadow-md border border-gray-200 ${noPadding ? '' : 'p-6'} ${className}`}>
      {title && (
        <h3 className="text-xl font-semibold mb-4 text-gray-800">{title}</h3>
      )}
      {children}
    </div>
  );
};

export default Card;
