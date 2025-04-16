import { Link, useLocation } from 'react-router-dom';
import { BarChart3, Leaf, FolderTree, ShoppingCart, Users, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const routes = [
  {
    label: "Tableau de bord",
    icon: BarChart3,
    href: "/",
    color: "text-green-500",
  },
  {
    label: "Plantes",
    icon: Leaf,
    href: "/plants",
    color: "text-green-500",
  },
  {
    label: "Catégories",
    icon: FolderTree,
    href: "/categories",
    color: "text-green-500",
  },
  {
    label: "Commandes",
    icon: ShoppingCart,
    href: "/orders",
    color: "text-green-500",
  },
  {
    label: "Utilisateurs",
    icon: Users,
    href: "/users",
    color: "text-green-500",
  },
  {
    label: "Paramètres",
    icon: Settings,
    href: "/settings",
  },
];

function Sidebar() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-muted/40 border-r text-muted-foreground">
      <div className="px-3 py-2 flex-1">
        <Link to="/" className="flex items-center pl-3 mb-8">
          <h1 className="text-xl font-bold text-green-600">PéAPInière Admin</h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Button
              key={route.href}
              variant={pathname === route.href ? "secondary" : "ghost"}
              className={cn("w-full justify-start", pathname === route.href && "bg-muted")}
              asChild
            >
              <Link to={route.href}>
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </Link>
            </Button>
          ))}
        </div>
      </div>
      <div className="px-3 py-2">
        <Button variant="ghost" className="w-full justify-start text-muted-foreground">
          <LogOut className="h-5 w-5 mr-3" />
          Déconnexion
        </Button>
      </div>
    </div>
  );
}

export default Sidebar;