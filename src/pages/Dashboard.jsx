import React, { useContext, useState, useMemo } from "react";
import { AppContext } from "../context/AppContext";
import {
  User,
  Home,
  DollarSign,
  Users,
  ShoppingCart,
  TrendingUp,
  BarChart2
} from "lucide-react";

export default function Dashboard() {
  const { currentUser, clients } = useContext(AppContext);
  const [periodo, setPeriodo] = useState("todo");

  // Filtrar clientes por periodo
  const clientesFiltrados = useMemo(() => {
    const ahora = new Date();
    return clients.filter((c) => {
      const fechaCliente = new Date(c.fecha);

      switch (periodo) {
        case "hoy":
          return fechaCliente.toDateString() === ahora.toDateString();
        case "semana":
          const hace7dias = new Date(ahora.getTime() - 7 * 24 * 60 * 60 * 1000);
          return fechaCliente >= hace7dias;
        case "mes":
          return (
            fechaCliente.getMonth() === ahora.getMonth() &&
            fechaCliente.getFullYear() === ahora.getFullYear()
          );
        default:
          return true;
      }
    });
  }, [clients, periodo]);

  // Calcular estadísticas
  const stats = useMemo(() => {
    let totalVentas = 0;
    let numVentas = 0;
    let clientesCompraron = 0;

    clientesFiltrados.forEach((c) => {
      if (c.ventas && c.ventas.length > 0) {
        clientesCompraron++;
        c.ventas.forEach((v) => {
          totalVentas += Number(v.monto || 0);
          numVentas++;
        });
      }
    });

    return {
      totalVentas,
      numClientes: clientesFiltrados.length,
      clientesCompraron,
      promedioPorVenta: numVentas > 0 ? totalVentas / numVentas : 0,
      tasaConversion:
        clientesFiltrados.length > 0
          ? (clientesCompraron / clientesFiltrados.length) * 100
          : 0
    };
  }, [clientesFiltrados]);

  return (
    <div className="pb-20"> {/* espacio para barra móvil */}

      {/* Header móvil */}
      <div className="bg-indigo-600 text-white p-4 md:p-6 rounded-b-2xl shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
            <User size={32} />
          </div>
          <div>
            <h1 className="text-xl font-bold">
              {currentUser?.nombre || "Vendedor"}
            </h1>
            <p className="text-sm text-white/80">@{currentUser?.username}</p>
          </div>
        </div>

        {/* Selector periodo */}
        <div className="mt-4 bg-white/10 p-2 rounded-lg backdrop-blur-sm">
          <select
            value={periodo}
            onChange={(e) => setPeriodo(e.target.value)}
            className="w-full bg-white/20 px-3 py-2 rounded-lg text-white focus:outline-none"
          >
            <option value="hoy" className="text-black">Hoy</option>
            <option value="semana" className="text-black">Esta semana</option>
            <option value="mes" className="text-black">Este mes</option>
            <option value="todo" className="text-black">Todo el tiempo</option>
          </select>
        </div>
      </div>

      {/* Tarjetas estadísticas (optimizado móvil) */}
      <div className="p-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">

        {/* CARD */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <DollarSign className="text-green-400 mb-2" size={22} />
          <p className="text-slate-400 text-xs">Total ventas</p>
          <p className="text-lg font-bold text-white">
            ${stats.totalVentas.toLocaleString()}
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <Users className="text-blue-400 mb-2" size={22} />
          <p className="text-slate-400 text-xs">Clientes</p>
          <p className="text-lg font-bold text-white">
            {stats.numClientes}
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <ShoppingCart className="text-purple-400 mb-2" size={22} />
          <p className="text-slate-400 text-xs">Compraron</p>
          <p className="text-lg font-bold text-white">
            {stats.clientesCompraron}
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <TrendingUp className="text-amber-400 mb-2" size={22} />
          <p className="text-slate-400 text-xs">Promedio</p>
          <p className="text-lg font-bold text-white">
            ${stats.promedioPorVenta.toFixed(0)}
          </p>
        </div>

      </div>

      {/* Resumen */}
      <div className="p-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Resumen</h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-slate-800 p-3 rounded-lg">
              <p className="text-slate-400 text-xs">Sin compra</p>
              <p className="text-xl font-bold text-white">
                {stats.numClientes - stats.clientesCompraron}
              </p>
            </div>

            <div className="bg-slate-800 p-3 rounded-lg">
              <p className="text-slate-400 text-xs">Mejor venta</p>
              <p className="text-xl font-bold text-white">
                $
                {Math.max(
                  ...clientesFiltrados.flatMap((c) =>
                    (c.ventas || []).map((v) => Number(v.monto || 0))
                  ),
                  0
                ).toLocaleString()}
              </p>
            </div>

            <div className="bg-slate-800 p-3 rounded-lg">
              <p className="text-slate-400 text-xs">Transacciones</p>
              <p className="text-xl font-bold text-white">
                {clientesFiltrados.reduce(
                  (sum, c) => sum + (c.ventas?.length || 0),
                  0
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* BARRA INFERIOR TIPO APP */}
      <div className="fixed bottom-0 left-0 w-full bg-slate-900 border-t border-slate-800 py-2 flex justify-around sm:hidden">

        <button className="flex flex-col items-center text-white/70 hover:text-white">
          <Home size={22} />
          <span className="text-xs mt-1">Inicio</span>
        </button>

        <button className="flex flex-col items-center text-white/70 hover:text-white">
          <Users size={22} />
          <span className="text-xs mt-1">Clientes</span>
        </button>

        <button className="flex flex-col items-center text-white/70 hover:text-white">
          <DollarSign size={22} />
          <span className="text-xs mt-1">Ventas</span>
        </button>

        <button className="flex flex-col items-center text-white/70 hover:text-white">
          <BarChart2 size={22} />
          <span className="text-xs mt-1">Stats</span>
        </button>

        <button className="flex flex-col items-center text-white/70 hover:text-white">
          <User size={22} />
          <span className="text-xs mt-1">Perfil</span>
        </button>

      </div>
    </div>
  );
}
