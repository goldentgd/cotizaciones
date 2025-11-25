import { useState, useEffect } from "react";
import { FaTimes, FaPlus, FaTrash } from "react-icons/fa";
import { z } from "zod";

const unidadesSAT = ["Caja", "Pieza", "Bolsa", "Kilo", "Frasco"];

const PartidaSchema = z.object({
  id: z.number(),
  cantidad: z.number().positive("La cantidad debe ser mayor a 0"),
  descripcion: z.string().min(1, "La descripción es obligatoria"),
  unidad: z.string().min(1, "Selecciona una unidad"),
  precio: z.number().nonnegative("El precio no puede ser negativo"),
  total: z.number(),
});

const CotizacionSchema = z.object({
  cliente: z.string().min(1, "El cliente es obligatorio"),
  direccion: z.string().optional(),
  razonSocial: z.string().optional(),
  ordenVenta: z.string().optional(),
  fecha: z.string().min(1, "La fecha es obligatoria"),
  consecutivo: z.string().optional(),
  partidas: z.array(PartidaSchema).min(1, "Debes agregar al menos una partida"),
  subtotal: z.number(),
  iva: z.number(),
  totalGeneral: z.number(),
});

function ModalConceptos({ isOpen, onClose, onSave, cotizacion }) {
  const [cliente, setCliente] = useState("");
  const [direccion, setDireccion] = useState("");
  const [razonSocial, setRazonSocial] = useState("");
  const [ordenVenta, setOrdenVenta] = useState("");
  const [partidas, setPartidas] = useState([]);
  const [fecha, setFecha] = useState("");
  const [consecutivo, setConsecutivo] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (cotizacion) {
      setCliente(cotizacion.cliente || "");
      setDireccion(cotizacion.direccion || "");
      setRazonSocial(cotizacion.razonSocial || "");
      setOrdenVenta(cotizacion.ordenVenta || "");
      setPartidas(cotizacion.partidas || []);
      setFecha(cotizacion.fecha || new Date().toISOString().slice(0, 10));
      setConsecutivo(cotizacion.consecutivo || "");
    } else {
      setCliente("");
      setDireccion("");
      setRazonSocial("");
      setOrdenVenta("");
      setPartidas([]);
      setFecha(new Date().toISOString().slice(0, 10));
      setConsecutivo("");
    }
    setErrors({});
  }, [cotizacion, isOpen]);

  if (!isOpen) return null;

  const agregarPartida = () => {
    setPartidas([
      ...partidas,
      { id: Date.now(), cantidad: 1, descripcion: "", unidad: "", precio: 0, total: 0 },
    ]);
  };

  const eliminarPartida = (id) => {
    setPartidas(partidas.filter((p) => p.id !== id));
  };

  const actualizarPartida = (id, field, value) => {
    setPartidas(
      partidas.map((p) =>
        p.id === id
          ? {
              ...p,
              [field]: field === "cantidad" || field === "precio" ? Number(value) : value,
              total:
                field === "cantidad" || field === "precio"
                  ? (field === "cantidad" ? Number(value) : p.cantidad) *
                    (field === "precio" ? Number(value) : p.precio)
                  : p.total,
            }
          : p
      )
    );
  };

  const subtotal = partidas.reduce((acc, p) => acc + p.total, 0);
  const iva = subtotal * 0.16;
  const totalGeneral = subtotal + iva;

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      cliente,
      direccion,
      razonSocial,
      ordenVenta,
      fecha,
      consecutivo,
      partidas,
      subtotal,
      iva,
      totalGeneral,
    };

    const result = CotizacionSchema.safeParse(data);

    if (!result.success) {
      const formatted = {};
      result.error.issues.forEach((issue) => {
        formatted[issue.path.join(".")] = issue.message;
      });
      setErrors(formatted);
      return;
    }

    onSave(result.data);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-auto">
      <div className="bg-white rounded-xl w-full max-w-4xl p-6 relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <FaTimes />
        </button>

        <h2 className="text-xl font-bold mb-4">
          {cotizacion?.id ? "Editar Cotización" : "Nueva Cotización"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Datos cliente */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Cliente</label>
              <input
                type="text"
                value={cliente}
                onChange={(e) => setCliente(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              />
              {errors.cliente && <p className="text-red-600 text-sm">{errors.cliente}</p>}
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Dirección</label>
              <input
                type="text"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Razón Social</label>
              <input
                type="text"
                value={razonSocial}
                onChange={(e) => setRazonSocial(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>

          {/* Extra inputs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Orden de Venta</label>
              <input
                type="text"
                value={ordenVenta}
                onChange={(e) => setOrdenVenta(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Fecha</label>
              <input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              />
              {errors.fecha && <p className="text-red-600 text-sm">{errors.fecha}</p>}
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Consecutivo</label>
              <input
                type="text"
                value={consecutivo}
                readOnly
                className="w-full px-3 py-2 border rounded-lg bg-gray-200 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Tabla de partidas */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Partidas</h3>
              <button
                type="button"
                onClick={agregarPartida}
                className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded"
              >
                <FaPlus /> Agregar
              </button>
            </div>

            {errors.partidas && (
              <p className="text-red-600 text-sm mb-2">{errors.partidas}</p>
            )}

            <div className="overflow-x-auto">
              <table className="w-full border rounded-lg overflow-hidden">
                <thead className="bg-gray-200">
                  <tr>
                    <th>#</th>
                    <th>Cantidad</th>
                    <th>Descripción</th>
                    <th>Unidad</th>
                    <th>Precio</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {partidas.map((p, index) => (
                    <tr key={p.id} className="border-b">
                      <td className="text-center">{index + 1}</td>

                      {/* Cantidad */}
                      <td>
                        <input
                          type="number"
                          value={p.cantidad}
                          onChange={(e) =>
                            actualizarPartida(p.id, "cantidad", e.target.value)
                          }
                          className="w-full px-1 py-1 border rounded"
                        />
                        {errors[`partidas.${index}.cantidad`] && (
                          <p className="text-red-600 text-sm">
                            {errors[`partidas.${index}.cantidad`]}
                          </p>
                        )}
                      </td>

                      {/* Descripción */}
                      <td>
                        <input
                          type="text"
                          value={p.descripcion}
                          onChange={(e) =>
                            actualizarPartida(p.id, "descripcion", e.target.value)
                          }
                          className="w-full px-1 py-1 border rounded"
                        />
                        {errors[`partidas.${index}.descripcion`] && (
                          <p className="text-red-600 text-sm">
                            {errors[`partidas.${index}.descripcion`]}
                          </p>
                        )}
                      </td>

                      {/* Unidad */}
                      <td>
                        <select
                          value={p.unidad}
                          onChange={(e) =>
                            actualizarPartida(p.id, "unidad", e.target.value)
                          }
                          className="w-full px-1 py-1 border rounded"
                        >
                          <option value="">Selecciona unidad</option>
                          {unidadesSAT.map((u) => (
                            <option key={u} value={u}>
                              {u}
                            </option>
                          ))}
                        </select>
                        {errors[`partidas.${index}.unidad`] && (
                          <p className="text-red-600 text-sm">
                            {errors[`partidas.${index}.unidad`]}
                          </p>
                        )}
                      </td>

                      {/* Precio */}
                      <td>
                        <input
                          type="number"
                          value={p.precio}
                          onChange={(e) =>
                            actualizarPartida(p.id, "precio", e.target.value)
                          }
                          className="w-full px-1 py-1 border rounded"
                        />
                      </td>

                      <td className="text-right">${p.total.toFixed(2)}</td>

                      <td className="text-center">
                        <button
                          type="button"
                          onClick={() => eliminarPartida(p.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}

                  {partidas.length === 0 && (
                    <tr>
                      <td colSpan={7} className="text-center py-2 text-gray-500">
                        No hay partidas
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Totales */}
          <div className="flex justify-end gap-4 mt-4 text-lg font-semibold">
            <div>Subtotal: ${subtotal.toFixed(2)}</div>
            <div>IVA (16%): ${iva.toFixed(2)}</div>
            <div>Total: ${totalGeneral.toFixed(2)}</div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalConceptos;
