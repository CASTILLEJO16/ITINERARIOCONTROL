import React from "react";

export default function Settings() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">⚙️ Configuración del Sistema</h1>

      <div className="space-y-4">

        {/* ============ SISTEMA ============ */}
        <details className="border rounded-lg p-4">
          <summary className="cursor-pointer text-lg font-semibold">
            Información del Sistema
          </summary>
          <div className="mt-3 space-y-3">
            <div>
              <label className="font-semibold">Nombre del sistema</label>
              <input className="w-full border p-2 rounded" placeholder="RSM Sales Manager" />
            </div>

            <div>
              <label className="font-semibold">Nombre de la empresa</label>
              <input className="w-full border p-2 rounded" placeholder="Mi Negocio SA" />
            </div>

            <div>
              <label className="font-semibold">Logo</label>
              <input type="file" className="w-full border p-2 rounded" />
            </div>

            <div>
              <label className="font-semibold">Mensaje de bienvenida</label>
              <input className="w-full border p-2 rounded" placeholder="Bienvenido al sistema" />
            </div>
          </div>
        </details>

        {/* ============ APARIENCIA ============ */}
        <details className="border rounded-lg p-4">
          <summary className="cursor-pointer text-lg font-semibold">Apariencia</summary>
          <div className="mt-3 space-y-3">

            <div className="flex justify-between items-center">
              <label className="font-semibold">Tema oscuro</label>
              <input type="checkbox" />
            </div>

            <div>
              <label className="font-semibold">Color principal</label>
              <input type="color" className="border p-2 rounded" />
            </div>

            <div className="flex justify-between items-center">
              <label className="font-semibold">Texto grande</label>
              <input type="checkbox" />
            </div>
          </div>
        </details>

        {/* ============ VENTAS ============ */}
        <details className="border rounded-lg p-4">
          <summary className="cursor-pointer text-lg font-semibold">Ventas</summary>
          <div className="mt-3 space-y-3">

            <div className="flex justify-between items-center">
              <label className="font-semibold">Activar registro de ventas</label>
              <input type="checkbox" />
            </div>

            <div className="flex justify-between items-center">
              <label className="font-semibold">IVA automático</label>
              <input type="checkbox" />
            </div>

            <div className="flex justify-between items-center">
              <label className="font-semibold">Permitir descuentos</label>
              <input type="checkbox" />
            </div>
          </div>
        </details>

        {/* ============ CLIENTES ============ */}
        <details className="border rounded-lg p-4">
          <summary className="cursor-pointer text-lg font-semibold">Clientes</summary>
          <div className="mt-3 space-y-3">

            <div className="flex justify-between items-center">
              <label className="font-semibold">Teléfono obligatorio</label>
              <input type="checkbox" />
            </div>

            <div className="flex justify-between items-center">
              <label className="font-semibold">Correo obligatorio</label>
              <input type="checkbox" />
            </div>

            <div className="flex justify-between items-center">
              <label className="font-semibold">Notas por cliente</label>
              <input type="checkbox" />
            </div>
          </div>
        </details>

        {/* ============ REPORTES ============ */}
        <details className="border rounded-lg p-4">
          <summary className="cursor-pointer text-lg font-semibold">
            Reportes y Gráficas
          </summary>
          <div className="mt-3 space-y-3">
            <div>
              <label className="font-semibold">Gráfica predeterminada</label>
              <select className="w-full border p-2 rounded">
                <option>Barras</option>
                <option>Pastel</option>
                <option>Línea</option>
              </select>
            </div>

            <div className="flex justify-between items-center">
              <label className="font-semibold">Activar dashboard</label>
              <input type="checkbox" />
            </div>
          </div>
        </details>

        {/* ============ SEGURIDAD ============ */}
        <details className="border rounded-lg p-4">
          <summary className="cursor-pointer text-lg font-semibold">Seguridad</summary>
          <div className="mt-3 space-y-3">
            <div>
              <label className="font-semibold">Nueva contraseña</label>
              <input type="password" className="w-full border p-2 rounded" />
            </div>

            <div className="flex justify-between items-center">
              <label className="font-semibold">Auto-cerrar sesión</label>
              <input type="checkbox" />
            </div>

            <div className="flex justify-between items-center">
              <label className="font-semibold">Restringir edición</label>
              <input type="checkbox" />
            </div>
          </div>
        </details>

        {/* ============ RESPALDO ============ */}
        <details className="border rounded-lg p-4">
          <summary className="cursor-pointer text-lg font-semibold">
            Respaldo y Base de Datos
          </summary>
          <div className="mt-3 space-y-3">

            <div className="flex justify-between items-center">
              <label className="font-semibold">Respaldos automáticos</label>
              <input type="checkbox" />
            </div>

            <button className="w-full bg-blue-600 text-white p-2 rounded">
              Exportar Base de Datos
            </button>

            <button className="w-full bg-gray-700 text-white p-2 rounded">
              Importar Base de Datos
            </button>

            <button className="w-full bg-red-600 text-white p-2 rounded">
              Restablecer sistema
            </button>
          </div>
        </details>
      </div>
    </div>
  );
}
