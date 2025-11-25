import { useState } from "react";
import ModalUsuario from "./ModalUsuario";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: "Admin", username: "admin", password:"1234", rol: "Administrador", permisos: "Todos" }
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [usuarioEdit, setUsuarioEdit] = useState(null);

  const abrirModalNuevo = () => {
    setUsuarioEdit(null);
    setModalOpen(true);
  };

  const editarUsuario = (u) => {
    setUsuarioEdit(u);
    setModalOpen(true);
  };

  const eliminarUsuario = (id) => {
    const usuario = usuarios.find(u => u.id === id);
    if(usuario.username === "admin") return alert("No se puede borrar el usuario admin");
    if(confirm("¿Deseas eliminar este usuario?")){
      setUsuarios(usuarios.filter(u => u.id !== id));
    }
  };

  const guardarUsuario = (data) => {
    if (data.id) {
      setUsuarios(usuarios.map(u => u.id === data.id ? {...u, ...data} : u));
    } else {
      const nuevo = {...data, id: Date.now()};
      setUsuarios([nuevo, ...usuarios]);
    }
  };

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button onClick={abrirModalNuevo} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Nuevo Usuario
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Usuario</th>
              <th>Rol</th>
              <th>Permisos</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u, i) => (
              <tr key={u.id} className="border-b last:border-b-0">
                <td className="px-2 py-1 text-center">{i+1}</td>
                <td className="px-2 py-1 text-center">{u.nombre}</td>
                <td className="px-2 py-1 text-center">{u.username}</td>
                <td className="px-2 py-1 text-center">{u.rol}</td>
                <td className="px-2 py-1 text-center">{u.permisos}</td>
                <td className="px-2 py-1 flex gap-2 justify-center">
                  <button onClick={() => editarUsuario(u)} className="text-blue-600 hover:text-blue-800"><FaEdit /></button>
                  <button onClick={() => eliminarUsuario(u.id)} className="text-red-600 hover:text-red-800"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ModalUsuario isOpen={modalOpen} onClose={() => setModalOpen(false)} onSave={guardarUsuario} usuario={usuarioEdit}/>
    </div>
  );
}
