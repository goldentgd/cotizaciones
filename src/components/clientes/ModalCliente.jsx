import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { z } from "zod";

const clienteSchema = z.object({
  razonSocial: z.string().min(3, "La razón social debe tener al menos 3 caracteres."),
  calleNumero: z.string().min(3, "La calle y número son obligatorios."),
  colonia: z.string().min(3, "La colonia es obligatoria."),
  cp: z
    .string()
    .regex(/^\d{5}$/, "El código postal debe tener 5 dígitos."),
  delegacion: z.string().min(3, "La delegación es obligatoria."),
  ciudad: z.string().min(3, "La ciudad es obligatoria."),
  estado: z.string().min(3, "El estado es obligatorio."),
});

function ModalCliente({ isOpen, onClose, onSave, cliente }) {
  const [razonSocial, setRazonSocial] = useState("");
  const [calleNumero, setCalleNumero] = useState("");
  const [colonia, setColonia] = useState("");
  const [cp, setCp] = useState("");
  const [delegacion, setDelegacion] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [estado, setEstado] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (cliente) {
      setRazonSocial(cliente.razonSocial || "");
      setCalleNumero(cliente.calleNumero || "");
      setColonia(cliente.colonia || "");
      setCp(cliente.cp || "");
      setDelegacion(cliente.delegacion || "");
      setCiudad(cliente.ciudad || "");
      setEstado(cliente.estado || "");
    } else {
      setRazonSocial("");
      setCalleNumero("");
      setColonia("");
      setCp("");
      setDelegacion("");
      setCiudad("");
      setEstado("");
    }
    setErrors({});
  }, [cliente, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      razonSocial,
      calleNumero,
      colonia,
      cp,
      delegacion,
      ciudad,
      estado,
    };

    const result = clienteSchema.safeParse(formData);

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }

    setErrors({});
    onSave({ ...cliente, ...formData });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-auto">
      <div className="bg-white rounded-xl w-full max-w-2xl p-6 relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <FaTimes />
        </button>

        <h2 className="text-xl font-bold mb-4">
          {cliente?.id ? "Editar Cliente" : "Nuevo Cliente"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Razón Social */}
            <div>
              <label className="block mb-1">Razón Social</label>
              <input
                type="text"
                value={razonSocial}
                onChange={(e) => setRazonSocial(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              />
              {errors.razonSocial && (
                <p className="text-red-500 text-sm">{errors.razonSocial[0]}</p>
              )}
            </div>

            {/* Calle y Número */}
            <div>
              <label className="block mb-1">Calle y Número</label>
              <input
                type="text"
                value={calleNumero}
                onChange={(e) => setCalleNumero(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              />
              {errors.calleNumero && (
                <p className="text-red-500 text-sm">{errors.calleNumero[0]}</p>
              )}
            </div>

            {/* Colonia */}
            <div>
              <label className="block mb-1">Colonia</label>
              <input
                type="text"
                value={colonia}
                onChange={(e) => setColonia(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              />
              {errors.colonia && (
                <p className="text-red-500 text-sm">{errors.colonia[0]}</p>
              )}
            </div>

            {/* CP */}
            <div>
              <label className="block mb-1">Código Postal</label>
              <input
                type="text"
                value={cp}
                onChange={(e) => setCp(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              />
              {errors.cp && (
                <p className="text-red-500 text-sm">{errors.cp[0]}</p>
              )}
            </div>

            {/* Delegación */}
            <div>
              <label className="block mb-1">Delegación</label>
              <input
                type="text"
                value={delegacion}
                onChange={(e) => setDelegacion(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              />
              {errors.delegacion && (
                <p className="text-red-500 text-sm">{errors.delegacion[0]}</p>
              )}
            </div>

            {/* Ciudad */}
            <div>
              <label className="block mb-1">Ciudad</label>
              <input
                type="text"
                value={ciudad}
                onChange={(e) => setCiudad(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              />
              {errors.ciudad && (
                <p className="text-red-500 text-sm">{errors.ciudad[0]}</p>
              )}
            </div>

            {/* Estado */}
            <div>
              <label className="block mb-1">Estado</label>
              <input
                type="text"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              />
              {errors.estado && (
                <p className="text-red-500 text-sm">{errors.estado[0]}</p>
              )}
            </div>

          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-300">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalCliente;
