import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import {z} from "zod";

const modalUsuarioSchema = z.object({
  nombre: z.string().min(3, "El nombre debe tener al menos 3 caracteres."),
  username: z.string().min(3, "El usuario debe tener al menos 3 caracteres."),
  password: z.string().min(4, "La contraseña debe tener al menos 4 caracteres."),
  rol: z.enum(["Administrador", "Vendedor"]),
  permisos: z.string().optional(),
});


function ModalUsuario({ isOpen, onClose, onSave, usuario }) {
  const [nombre, setNombre] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("Vendedor");
  const [permisos, setPermisos] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if(usuario){
      setNombre(usuario.nombre || "");
      setUsername(usuario.username || "");
      setPassword(usuario.password || "");
      setRol(usuario.rol || "Vendedor");
      setPermisos(usuario.permisos || "");
    } else {
      setNombre("");
      setUsername("");
      setPassword("");
      setRol("Vendedor");
      setPermisos("");
    }setErrors({});
  }, [usuario, isOpen]);

  if(!isOpen) return null;

  const handleSubmit = (e) => {
  e.preventDefault();

  const result = modalUsuarioSchema.safeParse({
    nombre,
    username,
    password,
    rol,
    permisos
  });

  if (!result.success) {
    const formattedErrors = result.error.flatten().fieldErrors;
    setErrors(formattedErrors);
    return;
  }

  setErrors({});

  onSave({
    ...usuario,
    nombre,
    username,
    password,
    rol,
    permisos
  });

  onClose();
};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-auto">
      <div className="bg-white rounded-xl w-full max-w-md p-6 relative shadow-lg">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"><FaTimes/></button>
        <h2 className="text-xl font-bold mb-4">{usuario?.id ? "Editar Usuario" : "Nuevo Usuario"}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Nombre</label>
            <input type="text" value={nombre} onChange={e => setNombre(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"/>
              {errors.nombre && ( <p className="text-red-500 text-sm mt-1">{errors.nombre[0]}</p>)}
          </div>
          <div>
            <label className="block mb-1">Usuario</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"/>
              {errors.username && ( <p className="text-red-500 text-sm mt-1">{errors.username[0]}</p>)}
          </div>
          <div>
            <label className="block mb-1">Contraseña</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"/>
              {errors.password && ( <p className="text-red-500 text-sm mt-1">{errors.password[0]}</p>)}
          </div>
          <div>
            <label className="block mb-1">Rol</label>
            <select value={rol} onChange={e => setRol(e.target.value)} className="w-full px-3 py-2 border rounded-lg">
              <option>Administrador</option>
              <option>Vendedor</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">Permisos</label>
            <input type="text" value={permisos} onChange={e => setPermisos(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg" placeholder="Todos o descripción"/>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">Cancelar</button>
            <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default ModalUsuario;