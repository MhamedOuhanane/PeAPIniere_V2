import { Link, useLocation } from 'react-router-dom';

const routes = [
  { label: "Tableau de bord", href: "/", icon: "🏠", color: "text-green-500" },
  { label: "Plantes", href: "/plants", icon: "🌿", color: "text-green-500" },
  { label: "Catégories", href: "/categories", icon: "📂", color: "text-green-500" },
  { label: "Commandes", href: "/orders", icon: "🛒", color: "text-green-500" },
  { label: "Utilisateurs", href: "/users", icon: "👥", color: "text-green-500" },
  { label: "Paramètres", href: "/settings", icon: "⚙️" },
];

function Sidebar() {
  const { pathname } = useLocation();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-gray-100 border-r text-gray-700">
      <div className="px-3 py-2 flex-1">
        <Link to="/" className="flex items-center pl-3 mb-8">
          <h1 className="text-xl font-bold text-green-600">PéAPInière Admin</h1>
        </Link>
        <div className="space-y-1">
          {routes.map(({ label, href, icon, color }) => (
            <Link 
              key={href} 
              to={href} 
              className={`w-full flex items-center py-2 px-3 rounded-md  ${pathname === href ? 'bg-gray-300' : ''} ${color}`}>
              <span className="mr-3">{icon}</span>
              {label}
            </Link>
          ))}
        </div>
      </div>
      <div className="px-3 py-2">
        <Link to="/logout" className="w-full flex items-center py-2 px-3 text-gray-700">
          <span className="mr-3">🚪</span>
          Déconnexion
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
