const EmptyState = ({ icon, title, description, action }) => {
  return (
    <div className="text-center py-12 px-4">
      {icon && (
        <div className="text-6xl mb-4" aria-hidden="true">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-semibold text-gray-700 mb-2">{title}</h3>
      {description && (
        <p className="text-gray-500 mb-6 max-w-md mx-auto">{description}</p>
      )}
      {action}
    </div>
  );
};

export default EmptyState;
