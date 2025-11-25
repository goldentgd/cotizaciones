import { useState } from "react";
import ModalGlobal from "./ModalGlobal";
import { FaEdit, FaTrash } from "react-icons/fa";

function Global() {
  const [globales, setGlobales] = useState([
    { id: 1, nombre: "IVA_EMPRESA_A", valor: 16 },
    { id: 2, nombre: "IVA_EMPRESA_B", valor: 0 },
    { id: 3, nombre: "CONSECUTIVO_EMPRESA_A", valor: 3210 },
    { id: 4, nombre: "CONSECUTIVO_EMPRESA_B", valor: 3010 }
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [paramEdit, setParamEdit] = useState(null);

  const abrirModalNuevo = () => {
    setParamEdit(null);
    setModalOpen(true);
  };

  const editarParametro = (p) => {
    setParamEdit(p);
    setModalOpen(true);
  };

  const eliminarParametro = (id) => {
    if(confirm("¿Deseas eliminar este parámetro?")){
      setGlobales(globales.filter(p => p.id !== id));
    }
  };

  const guardarParametro = (data) => {
    if(data.id){
      setGlobales(globales.map(p => p.id === data.id ? {...p, ...data} : p));
    } else {
      const nuevo = {...data, id: Date.now()};
      setGlobales([nuevo, ...globales]);
    }
  };

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button onClick={abrirModalNuevo} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Nuevo Parámetro
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Valor</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {globales.map((p,i) => (
              <tr key={p.id} className="border-b last:border-b-0">
                <td className="px-2 py-1">{i+1}</td>
                <td className="px-2 py-1">{p.nombre}</td>
                <td className="px-2 py-1">{String(p.valor)}</td>
                <td className="px-2 py-1 flex gap-2 justify-center">
                  <button onClick={() => editarParametro(p)} className="text-blue-600 hover:text-blue-800"><FaEdit /></button>
                  <button onClick={() => eliminarParametro(p.id)} className="text-red-600 hover:text-red-800"><FaTrash /></button>
                </td>
              </tr>
            ))}
            {globales.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-2 text-gray-500">
                  No hay parámetros
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ModalGlobal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSave={guardarParametro} parametro={paramEdit} />
    </div>
  );
}
export default Global;
