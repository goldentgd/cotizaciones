import { useState } from "react";
import ModalSaro from "./ModalSaro";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";

export default function Saro() {
  const [cotizaciones, setCotizaciones] = useState([
    { id: 1, fecha: "2024-06-01", cliente: "Cliente Uno", consecutivo: "3009", ordenVenta: "SA-1001", totalGeneral: 1500.00 },
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [cotizacionEdit, setCotizacionEdit] = useState(null);
  const [proximoConsecutivo, setProximoConsecutivo] = useState(3010);
  const [busqueda, setBusqueda] = useState("");

  const abrirModalNuevo = () => {
    setCotizacionEdit({
      consecutivo: proximoConsecutivo.toString().padStart(4, "0"),
    });
    setModalOpen(true);
  };

  const editarCotizacion = (cot) => {
    setCotizacionEdit(cot);
    setModalOpen(true);
  };

  const eliminarCotizacion = (id) => {
    if (confirm("¿Deseas eliminar esta cotización?")) {
      setCotizaciones(cotizaciones.filter((c) => c.id !== id));
    }
  };

  const guardarCotizacion = (data) => {
    if (data.id) {
      setCotizaciones(cotizaciones.map((c) => (c.id === data.id ? { ...c, ...data } : c)));
    } else {
      const nueva = { ...data, id: Date.now() };
      setCotizaciones([nueva, ...cotizaciones]);
      setProximoConsecutivo(proximoConsecutivo + 1);
    }
  };

  const cotizacionesFiltradas = cotizaciones.filter((c) => {
    const texto = busqueda.toLowerCase();
    return (
      c.cliente.toLowerCase().includes(texto) ||
      c.consecutivo.includes(texto) ||
      (c.ordenVenta?.toLowerCase().includes(texto) ?? false)
    );
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Cotizaciones</h1>

      {/* Buscador y botón en la misma línea */}
      <div className="mb-4 flex flex-col md:flex-row md:items-center md:gap-2">
        <input
          type="text"
          placeholder="Buscar por cliente, consecutivo u orden de venta..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
        />
        
        <button
          onClick={abrirModalNuevo}
          className="mt-2 md:mt-0 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          <FaPlus/>
        </button>
      </div>

      {/* Tabla de cotizaciones */}
      <div className="overflow-x-auto">
        <table className="w-full border rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-2 py-1">#</th>
              <th className="px-2 py-1">Fecha</th>
              <th className="px-2 py-1">Cliente</th>
              <th className="px-2 py-1">Consecutivo</th>
              <th className="px-2 py-1">Orden de Venta(Requisición)</th>
              <th className="px-2 py-1">Total</th>
              <th className="px-2 py-1">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cotizacionesFiltradas.map((c, index) => (
              <tr key={c.id} className="border-b last:border-b-0">
                <td className="px-2 py-1 text-center">{index + 1}</td>
                <td className="px-2 py-1 text-center">{c.fecha}</td>
                <td className="px-2 py-1 text-center">{c.cliente}</td>
                <td className="px-2 py-1 text-center">{c.consecutivo}</td>
                <td className="px-2 py-1 text-center">{c.ordenVenta || "-"}</td>
                <td className="px-2 py-1 text-center">${c.totalGeneral.toFixed(2)}</td>
                <td className="px-2 py-1 text-center flex justify-center gap-2">
                  <button
                    onClick={() => editarCotizacion(c)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => eliminarCotizacion(c.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            {cotizacionesFiltradas.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-2 text-gray-500">
                  No hay cotizaciones
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <ModalSaro
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={guardarCotizacion}
        cotizacion={cotizacionEdit}
      />
    </div>
  );
}
