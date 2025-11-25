import { useState } from "react";
import Usuarios from "./usuarios/Usuarios";
import Empresas from "./empresa/Empresas";
import Global from "./global/GlobalCompartida";
import { FaUsers, FaBuilding, FaGlobe } from "react-icons/fa";

function Configuracion() {
  const [seccion, setSeccion] = useState(null);

  const renderSeccion = () => {
    switch(seccion){
      case "usuarios": return <Usuarios />;
      case "empresas": return <Empresas />;
      case "global": return <Global />;
      default: return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            onClick={() => setSeccion("usuarios")}
            className="cursor-pointer bg-blue-600 text-white rounded-lg shadow hover:shadow-lg p-6 flex flex-col items-center justify-center transition"
          >
            <FaUsers className="text-4xl mb-2" />
            <span className="text-lg font-bold">Usuarios</span>
          </div>
          <div
            onClick={() => setSeccion("empresas")}
            className="cursor-pointer bg-green-600 text-white rounded-lg shadow hover:shadow-lg p-6 flex flex-col items-center justify-center transition"
          >
            <FaBuilding className="text-4xl mb-2" />
            <span className="text-lg font-bold">Empresas</span>
          </div>
          <div
            onClick={() => setSeccion("global")}
            className="cursor-pointer bg-purple-600 text-white rounded-lg shadow hover:shadow-lg p-6 flex flex-col items-center justify-center transition"
          >
            <FaGlobe className="text-4xl mb-2" />
            <span className="text-lg font-bold">Global Compartida</span>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Configuración</h1>
      {seccion && (
        <button
          onClick={() => setSeccion(null)}
          className="mb-6 text-blue-600 hover:underline flex items-center gap-2"
        >
          ← Volver al menú de configuración
        </button>
      )}
      {renderSeccion()}
    </div>
  );
}
export default Configuracion;
