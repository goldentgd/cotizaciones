import { useState } from "react";
import ModalCliente from "./ModalCliente";
import { FaEdit, FaTrash } from "react-icons/fa";

function Clientes() {
  const [clientes, setClientes] = useState([
    { id: 1, razonSocial: "Cliente Uno", calleNumero: "Calle 123", colonia: "Centro", cp: "12345", delegacion: "Delegación 1", ciudad: "Querétaro", estado: "Querétaro" },
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [clienteEdit, setClienteEdit] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  const abrirModalNuevo = () => {
    setClienteEdit(null);
    setModalOpen(true);
  };

  const editarCliente = (c) => {
    setClienteEdit(c);
    setModalOpen(true);
  };

  const eliminarCliente = (id) => {
    if (confirm("¿Deseas eliminar este cliente?")) {
      setClientes(clientes.filter((c) => c.id !== id));
    }
  };

  const guardarCliente = (data) => {
    if (data.id) {
      setClientes(clientes.map((c) => (c.id === data.id ? { ...c, ...data } : c)));
    } else {
      const nuevo = { ...data, id: Date.now() };
      setClientes([nuevo, ...clientes]);
    }
  };

  const clientesFiltrados = clientes.filter((c) =>
    c.razonSocial.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Clientes</h1>

      {/* Buscador y botón */}
      <div className="mb-4 flex flex-col md:flex-row md:items-center md:gap-2">
        <input
          type="text"
          placeholder="Buscar por razón social..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={abrirModalNuevo}
          className="mt-2 md:mt-0 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Nuevo Cliente
        </button>
      </div>

      {/* Tabla de clientes */}
      <div className="overflow-x-auto">
        <table className="w-full border rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-2 py-1">#</th>
              <th className="px-2 py-1">Razón Social</th>
              <th className="px-2 py-1">Dirección</th>
              <th className="px-2 py-1">Ciudad</th>
              <th className="px-2 py-1">Estado</th>
              <th className="px-2 py-1">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientesFiltrados.map((c, index) => (
              <tr key={c.id} className="border-b last:border-b-0">
                <td className="px-2 py-1 text-center">{index + 1}</td>
                <td className="px-2 py-1 text-center">{c.razonSocial}</td>
                <td className="px-2 py-1 text-center">{c.calleNumero}, {c.colonia}, {c.cp}, {c.delegacion}</td>
                <td className="px-2 py-1 text-center">{c.ciudad}</td>
                <td className="px-2 py-1 text-center">{c.estado}</td>
                <td className="px-2 py-1 text-center flex justify-center gap-2">
                  <button
                    onClick={() => editarCliente(c)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => eliminarCliente(c.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            {clientesFiltrados.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-2 text-gray-500">
                  No hay clientes
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <ModalCliente
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={guardarCliente}
        cliente={clienteEdit}
      />
    </div>
  );
}
export default Clientes;