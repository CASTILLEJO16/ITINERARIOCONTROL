import React, { useState, useContext } from "react";
import { Edit2, Trash2, Plus, QrCode } from "lucide-react";
import { AppContext } from "../context/AppContext";
import ConfirmDialog from "./ConfirmDialog";
import SaleForm from "./SaleForm";
import ObservationModal from "./ObservationModal";
import QRModal from "./QRModal";

export default function ClientList({ clients = [], onEdit, onDelete }) {
  const { enviarMensaje, fetchClients, agregarVenta } = useContext(AppContext);
  
  const [confirmDelete, setConfirmDelete] = useState({ open: false, client: null });
  const [saleForm, setSaleForm] = useState({ open: false, client: null });
  const [showObservationModal, setShowObservationModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);

  if (!clients || clients.length === 0)
    return <div className="bg-slate-800 p-6 rounded">No hay clientes registrados</div>;

  return (
    <>
      {/* 📱 VISTA MÓVIL - Cards */}
      <div className="block lg:hidden space-y-4">
        {clients.map((c) => (
          <div key={c._id} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            {/* Header */}
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-slate-100 text-lg">{c.nombre}</h3>
                {c.empresa && <p className="text-sm text-slate-400">{c.empresa}</p>}
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    setClienteSeleccionado(c);
                    setShowQRModal(true);
                  }}
                  className="text-blue-400 hover:text-blue-200 p-2 transition-colors" 
                  title="QR"
                >
                  <QrCode size={20} />
                </button>
                <button 
                  onClick={() => setSaleForm({ open: true, client: c })}
                  className="text-emerald-400 hover:text-emerald-200 p-2 transition-colors" 
                  title="Venta"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <p className="text-xs text-slate-500 mb-1">Contacto</p>
                <p className="text-sm text-slate-300">{c.telefono}</p>
                {c.email && <p className="text-xs text-slate-400 truncate">{c.email}</p>}
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Vendedor</p>
                <span className="inline-block px-2 py-1 rounded-full text-xs bg-indigo-900 text-indigo-300">
                  {c.vendedor?.nombre || c.vendedor?.username || c.vendedor || 'Sin asignar'}
                </span>
              </div>
            </div>

            {/* Total y Estado */}
            <div className="flex justify-between items-center mb-3 pb-3 border-b border-slate-800">
              <div>
                <p className="text-xs text-slate-500 mb-1">Total Ventas</p>
                <span className="text-emerald-400 font-semibold text-lg">
                  ${((c.ventas || []).reduce((sum, v) => sum + Number(v.monto || 0), 0)).toLocaleString()}
                </span>
              </div>
              <div>
                {c.compro === true && (
                  <span className="px-3 py-1 text-xs bg-emerald-900 text-emerald-200 rounded-full">
                    Compró
                  </span>
                )}
                {c.compro === false && (
                  <div className="text-right">
                    <span className="px-3 py-1 text-xs bg-rose-900 text-rose-200 rounded-full">
                      No compró
                    </span>
                    {c.razonNoCompra && (
                      <p className="text-xs mt-1 text-slate-400">{c.razonNoCompra}</p>
                    )}
                  </div>
                )}
                {c.compro === null && (
                  <span className="px-3 py-1 text-xs bg-yellow-900 text-yellow-200 rounded-full">
                    Pendiente
                  </span>
                )}
              </div>
            </div>

            {/* Fecha */}
            <div className="mb-3">
              <p className="text-xs text-slate-500">Fecha de registro</p>
              <p className="text-sm text-slate-300">
                {new Date(c.fecha).toLocaleDateString('es-MX', { 
                  timeZone: 'America/Mexico_City',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>

            {/* Acciones */}
            <div className="flex gap-2">
              <button 
                onClick={() => onEdit(c)}
                className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 py-2 rounded text-white text-sm transition-colors"
              >
                <Edit2 size={16} />
                Editar
              </button>
              <button 
                onClick={() => {
                  setClienteSeleccionado(c);
                  setShowObservationModal(true);
                }}
                className="flex-1 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 py-2 rounded text-white text-sm transition-colors"
              >
                💬 Mensaje
              </button>
              <button 
                onClick={() => setConfirmDelete({ open: true, client: c })}
                className="px-4 bg-rose-600 hover:bg-rose-700 py-2 rounded text-white text-sm transition-colors"
                title="Eliminar"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 🖥️ VISTA DESKTOP - Tabla */}
      <div className="hidden lg:block bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-850 text-slate-300 text-xs">
              <tr>
                <th className="px-6 py-3 text-left">Cliente</th>
                <th className="px-6 py-3 text-left">Contacto</th>
                <th className="px-6 py-3 text-left">Vendedor</th>
                <th className="px-6 py-3 text-left">Total Ventas</th>
                <th className="px-6 py-3 text-left">Fecha</th>
                <th className="px-6 py-3 text-left">Estado</th>
                <th className="px-6 py-3 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-slate-200">
              {clients.map((c) => (
                <tr key={c._id} className="border-b border-slate-800 hover:bg-slate-850">
                  <td className="px-6 py-4">
                    <p className="font-medium">{c.nombre}</p>
                    {c.empresa && <p className="text-sm text-slate-400">{c.empresa}</p>}
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm">{c.telefono}</p>
                    {c.email && <p className="text-sm text-slate-400">{c.email}</p>}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-full text-xs bg-indigo-900 text-indigo-300">
                      {c.vendedor?.nombre || c.vendedor?.username || c.vendedor || 'Sin asignar'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-emerald-400 font-semibold">
                      ${((c.ventas || []).reduce((sum, v) => sum + Number(v.monto || 0), 0)).toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {new Date(c.fecha).toLocaleDateString('es-MX', { 
                      timeZone: 'America/Mexico_City',
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit'
                    })}
                  </td>
                  <td className="px-6 py-4">
                    {c.compro === true && (
                      <span className="px-2 py-1 text-xs bg-emerald-900 text-emerald-200 rounded-full">
                        Compró
                      </span>
                    )}
                    {c.compro === false && (
                      <div>
                        <span className="px-2 py-1 text-xs bg-rose-900 text-rose-200 rounded-full">
                          No compró
                        </span>
                        {c.razonNoCompra && <p className="text-xs mt-1 text-slate-400">{c.razonNoCompra}</p>}
                      </div>
                    )}
                    {c.compro === null && (
                      <span className="px-2 py-1 text-xs bg-yellow-900 text-yellow-200 rounded-full">
                        Pendiente
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          setClienteSeleccionado(c);
                          setShowQRModal(true);
                        }}
                        className="text-blue-400 hover:text-blue-200 transition-colors"
                        title="Ver código QR"
                      >
                        <QrCode size={18} />
                      </button>
                      
                      <button 
                        onClick={() => setSaleForm({ open: true, client: c })} 
                        className="text-emerald-400 hover:text-emerald-200 transition-colors"
                        title="Registrar venta"
                      >
                        <Plus size={18} />
                      </button>
                      <button 
                        onClick={() => onEdit(c)} 
                        className="text-indigo-400 hover:text-indigo-200 transition-colors"
                        title="Editar cliente"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => setConfirmDelete({ open: true, client: c })} 
                        className="text-rose-400 hover:text-rose-200 transition-colors"
                        title="Eliminar cliente"
                      >
                        <Trash2 size={18} />
                      </button>
                      <button
                        className="text-purple-500 hover:text-purple-300 transition-colors"
                        onClick={() => {
                          setClienteSeleccionado(c);
                          setShowObservationModal(true);
                        }}
                        title="Enviar observación"
                      >
                        💬
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal QR */}
      {showQRModal && (
        <QRModal
          cliente={clienteSeleccionado}
          onClose={() => {
            setShowQRModal(false);
            setClienteSeleccionado(null);
          }}
        />
      )}

      {/* Modal de confirmación */}
      <ConfirmDialog
        open={confirmDelete.open}
        title="Eliminar Cliente"
        message={`¿Estás seguro de eliminar a ${confirmDelete.client?.nombre}? Esta acción no se puede deshacer.`}
        onConfirm={() => {
          onDelete(confirmDelete.client._id);
          setConfirmDelete({ open: false, client: null });
        }}
        onCancel={() => setConfirmDelete({ open: false, client: null })}
      />

      {/* Modal de nueva venta */}
      <SaleForm
        open={saleForm.open}
        cliente={saleForm.client}
        onClose={() => setSaleForm({ open: false, client: null })}
        onSave={async (venta) => {
          try {
            await agregarVenta(saleForm.client._id, venta);
            await fetchClients();
            setSaleForm({ open: false, client: null });
          } catch (error) {
            console.error("Error al guardar venta:", error);
            alert("Error al registrar la venta");
          }
        }}
      />

      {/* Modal de observaciones */}
      {showObservationModal && (
        <ObservationModal
          cliente={clienteSeleccionado}
          onClose={() => {
            setShowObservationModal(false);
            setClienteSeleccionado(null);
          }}
          onSave={async (data) => {
            try {
              await enviarMensaje(clienteSeleccionado._id, data);
              await fetchClients();
              setShowObservationModal(false);
              setClienteSeleccionado(null);
            } catch (error) {
              console.error("Error al guardar observación:", error);
              alert("Error al enviar el mensaje");
            }
          }}
        />
      )}
    </>
  );
}