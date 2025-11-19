const Card = ({ children, title, className = '', noPadding = false }) => {
  return (
    <div className={`glass-panel rounded-2xl ${noPadding ? '' : 'p-8'} ${className}`}>
      {title && (
        <h3 className="text-2xl font-bold mb-6 text-[var(--text-primary)]">{title}</h3>
      )}
      {children}
    </div>
  );
};

export default Card;
