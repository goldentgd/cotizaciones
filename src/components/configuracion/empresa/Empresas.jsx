import { useState } from "react";
import ModalEmpresa from "./ModalEmpresa";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function Empresas() {
  const [empresas, setEmpresas] = useState([
    { id: 1, razonSocial: "Google", rfc: "GABA213456KM7", calle: "Av. Siempre Viva", numero: "123", colonia: "Centro", cp: "01234", municipio: "Ciudad de México", estado: "CDMX", url: "https://www.google.com" },
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [empresaEdit, setEmpresaEdit] = useState(null);

  const abrirModalNuevo = () => {
    setEmpresaEdit(null);
    setModalOpen(true);
  };

  const editarEmpresa = (e) => {
    setEmpresaEdit(e);
    setModalOpen(true);
  };

  const eliminarEmpresa = (id) => {
    if(confirm("¿Deseas eliminar esta empresa?")){
      setEmpresas(empresas.filter(e => e.id !== id));
    }
  };

  const guardarEmpresa = (data) => {
    if(data.id){
      setEmpresas(empresas.map(e => e.id === data.id ? {...e, ...data} : e));
    } else {
      const nuevo = {...data, id: Date.now()};
      setEmpresas([nuevo, ...empresas]);
    }
  };

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button onClick={abrirModalNuevo} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Nueva Empresa
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th>#</th>
              <th>Razón Social</th>
              <th>RFC</th>
              <th>Dirección</th>
              <th>URL</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {empresas.map((e,i) => (
              <tr key={e.id} className="border-b last:border-b-0">
                <td className="px-2 py-1 text-center">{i+1}</td>
                <td className="px-2 py-1 text-center">{e.razonSocial}</td>
                <td className="px-2 py-1 text-center">{e.rfc}</td>
                <td className="px-2 py-1 text-center">{e.calle} {e.numero}, {e.colonia}, {e.cp}, {e.municipio}, {e.estado}</td>
                <td className="px-2 py-1 text-center">{e.url || "-"}</td>
                <td className="px-2 py-1 flex gap-2 justify-center">
                  <button onClick={() => editarEmpresa(e)} className="text-blue-600 hover:text-blue-800"><FaEdit /></button>
                  <button onClick={() => eliminarEmpresa(e.id)} className="text-red-600 hover:text-red-800"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ModalEmpresa isOpen={modalOpen} onClose={() => setModalOpen(false)} onSave={guardarEmpresa} empresa={empresaEdit}/>
    </div>
  );
}
