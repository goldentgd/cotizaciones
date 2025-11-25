import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import {z} from "zod";

const empresaSchema = z.object({
  razonSocial: z.string().min(3, "La razón social debe tener al menos 3 caracteres."),
  rfc: z.string()
    .regex(/^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/, "El RFC no es válido."),
  calle: z.string().min(1, "La calle es obligatoria."),
  numero: z.string().min(1, "El número es obligatorio."),
  colonia: z.string().optional(),
  cp: z
    .string()
    .regex(/^\d{5}$/, "El código postal debe tener 5 dígitos.")
    .optional(),
  municipio: z.string().optional(),
  estado: z.string().optional(),
  url: z.string().url("La URL no es válida.").optional().or(z.literal("")),
});


function ModalEmpresa({ isOpen, onClose, onSave, empresa }) {
  const [razonSocial, setRazonSocial] = useState("");
  const [rfc, setRfc] = useState("");
  const [calle, setCalle] = useState("");
  const [numero, setNumero] = useState("");
  const [colonia, setColonia] = useState("");
  const [cp, setCp] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [estado, setEstado] = useState("");
  const [url, setUrl] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if(empresa){
      setRazonSocial(empresa.razonSocial || "");
      setRfc(empresa.rfc || "");
      setCalle(empresa.calle || "");
      setNumero(empresa.numero || "");
      setColonia(empresa.colonia || "");
      setCp(empresa.cp || "");
      setMunicipio(empresa.municipio || "");
      setEstado(empresa.estado || "");
      setUrl(empresa.url || "");
    } else {
      setRazonSocial(""); setRfc(""); setCalle(""); setNumero(""); setColonia("");
      setCp(""); setMunicipio(""); setEstado(""); setUrl("");
    }setErrors({});
  }, [empresa, isOpen]);

  if(!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {razonSocial,rfc,calle,numero,colonia,cp,municipio,estado,url,};
    const result = empresaSchema.safeParse(formData);
    if (!result.success) {
      const formattedErrors = result.error.flatten().fieldErrors;
      setErrors(formattedErrors);
      return;
    }
    setErrors({});
    onSave({ ...empresa, ...formData });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-auto">
      <div className="bg-white rounded-xl w-full max-w-lg p-6 relative shadow-lg">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"><FaTimes/></button>
        <h2 className="text-xl font-bold mb-4">{empresa?.id ? "Editar Empresa" : "Nueva Empresa"}</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block mb-1">Razón Social</label>
            <input type="text" value={razonSocial} onChange={e => setRazonSocial(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"/>
              {errors.razonSocial && ( <p className="text-red-500 text-sm mt-1">{errors.razonSocial[0]}</p>)}
          </div>
          <div>
            <label className="block mb-1">RFC</label>
            <input type="text" value={rfc} onChange={e => setRfc(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"/>
              {errors.rfc && ( <p className="text-red-500 text-sm mt-1">{errors.rfc[0]}</p>)}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block mb-1">Calle</label>
              <input type="text" value={calle} onChange={e => setCalle(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"/>
                {errors.calle && ( <p className="text-red-500 text-sm mt-1">{errors.calle[0]}</p>)}
            </div>
            <div>
              <label className="block mb-1">Número</label>
              <input type="text" value={numero} onChange={e => setNumero(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"/>
                {errors.numero && ( <p className="text-red-500 text-sm mt-1">{errors.numero[0]}</p>)}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block mb-1">Colonia</label>
              <input type="text" value={colonia} onChange={e => setColonia(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"/>
                {errors.colonia && ( <p className="text-red-500 text-sm mt-1">{errors.colonia[0]}</p>)}
            </div>
            <div>
              <label className="block mb-1">Código Postal</label>
              <input type="text" value={cp} onChange={e => setCp(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"/>
                {errors.cp && ( <p className="text-red-500 text-sm mt-1">{errors.cp[0]}</p>)}
            </div>
            <div>
              <label className="block mb-1">Municipio / Ciudad</label>
              <input type="text" value={municipio} onChange={e => setMunicipio(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"/>
                {errors.municipio && ( <p className="text-red-500 text-sm mt-1">{errors.municipio[0]}</p>)}
            </div>
          </div>
          <div>
            <label className="block mb-1">Estado</label>
            <input type="text" value={estado} onChange={e => setEstado(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"/>
              {errors.estado && ( <p className="text-red-500 text-sm mt-1">{errors.estado[0]}</p>)}
          </div>
          <div>
            <label className="block mb-1">URL Página Oficial</label>
            <input type="text" value={url} onChange={e => setUrl(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"/>
              {errors.url && ( <p className="text-red-500 text-sm mt-1">{errors.url[0]}</p>)}
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
export default ModalEmpresa;