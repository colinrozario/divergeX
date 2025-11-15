const Card = ({ children, title, className = '', noPadding = false }) => {
  return (
    <div className={`bg-white rounded-3xl shadow-lg ${noPadding ? '' : 'p-8'} ${className}`}>
      {title && (
        <h3 className="text-2xl font-bold mb-6 text-gray-900">{title}</h3>
      )}
      {children}
    </div>
  );
};

export default Card;
