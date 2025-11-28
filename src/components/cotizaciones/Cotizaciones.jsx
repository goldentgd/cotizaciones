import { useState } from "react";
import { GrTechnology, MdOutlineFastfood, FaComputer } from "react-icons/fa";
import ConceptosTi from "./conceptos/ConceptosTi";
import Saro from "./saro/Saro";
import Sentinel from "./sentinel/Sentinel";

function Configuracion() {
  const [seccion, setSeccion] = useState(null);

  const renderSeccion = () => {
    switch(seccion){
      case "empresaA": return <ConceptosTi />;
      case "empresaB": return <Saro />;
      case "empresaC": return <Sentinel />;
      default: return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            onClick={() => setSeccion("empresaA")}
            className="cursor-pointer bg-blue-600 text-white rounded-lg shadow hover:shadow-lg p-6 flex flex-col items-center justify-center transition"
          >
            <GrTechnology className="text-4xl mb-2" />
            <span className="text-lg font-bold">Tech</span>
          </div>
          <div
            onClick={() => setSeccion("empresaB")}
            className="cursor-pointer bg-green-600 text-white rounded-lg shadow hover:shadow-lg p-6 flex flex-col items-center justify-center transition"
          >
            <MdOutlineFastfood className="text-4xl mb-2" />
            <span className="text-lg font-bold">Comers</span>
          </div>
          <div
            onClick={() => setSeccion("empresaC")}
            className="cursor-pointer bg-purple-600 text-white rounded-lg shadow hover:shadow-lg p-6 flex flex-col items-center justify-center transition"
          >
            <FaComputer className="text-4xl mb-2" />
            <span className="text-lg font-bold">CPTI</span>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Cotizaciones</h1>
      {seccion && (
        <button
          onClick={() => setSeccion(null)}
          className="mb-6 text-blue-600 hover:underline flex items-center gap-2"
        >
          ← Volver al menú de contizaciones
        </button>
      )}
      {renderSeccion()}
    </div>
  );
}
export default Configuracion;
