import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

function ModalGlobal({ isOpen, onClose, onSave, parametro }) {
  const [nombre, setNombre] = useState("");
  const [valor, setValor] = useState("");

  useEffect(() => {
    if(parametro){
      setNombre(parametro.nombre || "");
      setValor(parametro.valor || "");
    } else {
      setNombre("");
      setValor("");
    }
  }, [parametro, isOpen]);

  if(!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    let valorFinal = valor;

    if(!isNaN(valor)) valorFinal = Number(valor);
    if(valor.toLowerCase() === "true") valorFinal = true;
    if(valor.toLowerCase() === "false") valorFinal = false;

    onSave({ ...parametro, nombre, valor: valorFinal });
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-auto">
      <div className="bg-white rounded-xl w-full max-w-md p-6 relative shadow-lg">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"><FaTimes/></button>
        <h2 className="text-xl font-bold mb-4">{parametro?.id ? "Editar Parámetro" : "Nuevo Parámetro"}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Nombre</label>
            <input type="text" value={nombre} onChange={e => setNombre(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg" required/>
          </div>
          <div>
            <label className="block mb-1">Valor</label>
            <input type="text" value={valor} onChange={e => setValor(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg" required/>
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
export default ModalGlobal;