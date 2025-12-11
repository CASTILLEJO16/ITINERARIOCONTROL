import React from "react";
import { Home, Users, BarChart2, Settings, History } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function MobileNavbar() {
  const { pathname } = useLocation();

  const isActive = (path) =>
    pathname === path ? "text-white" : "text-white/60";

  return (
    <div
      className="
        fixed bottom-0 left-0 w-full bg-slate-900 border-t border-slate-800 
        py-2 flex justify-around md:hidden z-50
      "
    >
      <Link to="/dashboard" className={`flex flex-col items-center ${isActive("/dashboard")}`}>
        <Home size={22} />
        <span className="text-xs mt-1">Inicio</span>
      </Link>

      <Link to="/clients" className={`flex flex-col items-center ${isActive("/clients")}`}>
        <Users size={22} />
        <span className="text-xs mt-1">Clientes</span>
      </Link>

      <Link to="/analytics" className={`flex flex-col items-center ${isActive("/analytics")}`}>
        <BarChart2 size={22} />
        <span className="text-xs mt-1">Ventas</span>
      </Link>

      <Link to="/Historial" className={`flex flex-col items-center ${isActive("/Historial")}`}>
        <History size={22} />
        <span className="text-xs mt-1">Historial</span>
      </Link>

      <Link to="/settings" className={`flex flex-col items-center ${isActive("/settings")}`}>
        <Settings size={22} />
        <span className="text-xs mt-1">Ajustes</span>
      </Link>
    </div>
  );
}
