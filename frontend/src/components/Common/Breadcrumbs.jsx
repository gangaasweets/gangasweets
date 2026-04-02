import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const capitalize = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : "");

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center space-x-2 text-[13px] text-gray-500 font-medium lowercase tracking-tight">
        <li>
          <Link to="/" className="hover:text-black transition-colors">
            Home
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;

          return (
            <li key={to} className="flex items-center space-x-2">
              <span className="text-gray-400">/</span>
              {last ? (
                <span className="text-gray-900 font-semibold">{capitalize(value.replace(/-/g, " "))}</span>
              ) : (
                <Link to={to} className="hover:text-black transition-colors">
                  {capitalize(value.replace(/-/g, " "))}
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
