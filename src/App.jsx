import { useState } from "react";
import Login from "./components/Login"
import Dashboard from "./components/Dashboard";


function App() {
  const [logueado, setLogueado] = useState(false);

  return (
    <>
      {logueado ? (
        <Dashboard onLogout={() => setLogueado(false)}/>
      ) : (
        <Login onLogin={() => setLogueado(true)} />
      )}
    </>
  );
}

export default App;