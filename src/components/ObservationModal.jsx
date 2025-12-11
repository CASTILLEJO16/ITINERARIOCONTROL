import React, { useState } from "react";
import { X, Image as ImageIcon, Trash2 } from "lucide-react";

export default function ObservationModal({ cliente, onClose, onSave }) {
  const [mensaje, setMensaje] = useState("");
  const [imagen, setImagen] = useState(null);
  const [imagenPreview, setImagenPreview] = useState(null);

  if (!cliente) return null;

  // Función para comprimir y convertir imagen a base64
  const compressImage = (file, maxWidth = 1200, quality = 0.7) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const img = new Image();
        
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          // Redimensionar si es muy grande
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
          
          canvas.width = width;
          canvas.height = height;
          
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          // Comprimir a JPEG con calidad especificada
          const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
          resolve(compressedBase64);
        };
        
        img.onerror = reject;
        img.src = e.target.result;
      };
      
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Función para manejar cambio de imagen
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    
    if (!file) return;

    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona una imagen válida');
      return;
    }

    // Validar tamaño antes de comprimir (máximo 20MB original)
    if (file.size > 20 * 1024 * 1024) {
      alert('La imagen es demasiado grande. Por favor selecciona una imagen menor a 20MB');
      return;
    }

    try {
      // Comprimir imagen
      const compressedBase64 = await compressImage(file, 1200, 0.7);
      
      // Validar tamaño después de comprimir (máximo 2MB en base64)
      if (compressedBase64.length > 2 * 1024 * 1024) {
        alert('La imagen sigue siendo muy grande después de comprimir. Intenta con una imagen más pequeña');
        return;
      }
      
      setImagen(compressedBase64);
      setImagenPreview(compressedBase64);
    } catch (error) {
      console.error('Error comprimiendo imagen:', error);
      alert('Error al procesar la imagen. Intenta con otra');
    }
  };

  const eliminarImagen = () => {
    setImagen(null);
    setImagenPreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!mensaje.trim()) {
      alert('Por favor escribe un mensaje');
      return;
    }

    // Enviar mensaje con imagen (si existe)
    onSave({ mensaje: mensaje.trim(), imagen });
    
    // Limpiar formulario
    setMensaje("");
    setImagen(null);
    setImagenPreview(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-slate-100">
            Enviar Observación a {cliente.nombre}
          </h3>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-slate-200"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Textarea del mensaje */}
          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Mensaje <span className="text-red-400">*</span>
            </label>
            <textarea
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              placeholder="Escribe tu observación aquí..."
              className="w-full p-3 rounded bg-slate-800 border border-slate-700 text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[120px]"
              autoFocus
            />
          </div>

          {/* Input de imagen */}
          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Imagen (opcional)
            </label>
            
            {!imagenPreview ? (
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-700 rounded-lg cursor-pointer hover:border-purple-500 transition-colors bg-slate-800">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <ImageIcon className="w-10 h-10 mb-2 text-slate-400" />
                  <p className="text-sm text-slate-400">
                    Click para subir imagen
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    PNG, JPG o JPEG (máx. 20MB - se comprimirá automáticamente)
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="relative">
                <img
                  src={imagenPreview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg border border-slate-700"
                />
                <button
                  type="button"
                  onClick={eliminarImagen}
                  className="absolute top-2 right-2 p-2 bg-red-600 hover:bg-red-700 rounded-full text-white transition-colors"
                  title="Eliminar imagen"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Info */}
          {imagenPreview && (
            <div className="bg-blue-900/20 border border-blue-800/50 p-3 rounded-lg">
              <p className="text-xs text-blue-300">
                💡 La imagen se guardará junto con tu observación
              </p>
            </div>
          )}

          {/* Botones */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={!mensaje.trim()}
              className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-700 disabled:cursor-not-allowed py-2 rounded transition-colors text-white font-medium"
            >
              Guardar Observación
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-slate-700 rounded hover:bg-slate-800 transition-colors text-slate-300"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}