import { NavLink } from "react-router-dom";
import { Home, TrendingUp, Star, Calendar, Film } from "lucide-react";

const navItems = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/popular", label: "Popular", icon: TrendingUp },
  { to: "/top-rated", label: "Top Rated", icon: Star },
  { to: "/upcoming", label: "Upcoming", icon: Calendar },
];

export default function Sidebar() {
  return (
    <aside className="w-56 shrink-0 flex flex-col bg-white border-r border-slate-200 h-full">
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-slate-200">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <Film size={16} className="text-white" />
        </div>
        <span className="font-bold text-base tracking-tight">MovieHub</span>
      </div>
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              }`
            }
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
