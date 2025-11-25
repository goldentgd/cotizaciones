import { useState } from "react";
import { FaHome, FaFileInvoiceDollar, FaUsers, FaCog, FaSignOutAlt } from "react-icons/fa";
import Cotizaciones from "./cotizaciones/Cotizaciones";
import Clientes from "./clientes/Clientes";
import Configuracion from "./configuracion/Configuracion";

function Dashboard({ onLogout }) {
  const [active, setActive] = useState("Inicio");

  const menuItems = [
    { name: "Inicio", icon: <FaHome /> },
    { name: "Cotizaciones", icon: <FaFileInvoiceDollar /> },
    { name: "Clientes", icon: <FaUsers /> },
    { name: "Configuración", icon: <FaCog /> },
  ];

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-blue-600 text-white flex flex-col">
        <div className="h-20 flex items-center justify-center text-2xl font-bold border-b border-blue-500">
          Empresa
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActive(item.name)}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded hover:bg-blue-500 transition ${
                active === item.name ? "bg-blue-500 font-semibold" : ""
              }`}
            >
              {item.icon} {item.name}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-blue-500">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2 px-4 py-2 rounded hover:bg-blue-500 transition"
          >
            <FaSignOutAlt /> Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 bg-gray-100 overflow-auto">
        {active === "Inicio" && <h1 className="text-6xl font-extrabold mb-6 text-center drop-shadow-lg">Bienvenido 🎉</h1>}
        {active === "Cotizaciones" && <Cotizaciones />}
        {active === "Clientes" && <Clientes />}
        {active === "Configuración" && <Configuracion/>}
      </main>
    </div>
  );
}

export default Dashboard;