import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  const breadcrumbNames = {
    dashboard: 'Dashboard',
    communication: 'Communication',
    learning: 'Learning',
    planning: 'Planning',
    settings: 'Settings',
  };

  if (pathnames.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center gap-2 text-sm">
        <li>
          <Link to="/" className="text-blue-600 hover:text-blue-800 hover:underline">
            Home
          </Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const displayName = breadcrumbNames[name] || name;

          return (
            <li key={name} className="flex items-center gap-2">
              <span className="text-gray-400" aria-hidden="true">/</span>
              {isLast ? (
                <span className="text-gray-700 font-medium" aria-current="page">
                  {displayName}
                </span>
              ) : (
                <Link to={routeTo} className="text-blue-600 hover:text-blue-800 hover:underline">
                  {displayName}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
