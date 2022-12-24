import { useState } from "react";
import useClima from "../hooks/useClima";

const Formulario = () => {
    const [alerta, setAlerta] = useState('');
    const { busqueda,datosBusqueda,consultarClima,setBusqueda } = useClima();
    const { ciudad,pais } = busqueda;

    const handleSubmit = e => {
       e.preventDefault();
       
       if(Object.values(busqueda).includes('')){
           setAlerta('Todos los campos son obligatorios')
           return
       }

        setAlerta('');
        consultarClima(busqueda);
        setBusqueda({
          ciudad:'',
          pais:''
       });
    }

    return (
        <div className="contenedor">
            {alerta && <p>{alerta}</p>}
          <form
           onSubmit={handleSubmit}
          >
              <div className="campo">
                <label htmlFor="ciudad">Ciudad</label>
                <input
                    type="text"
                    id="ciudad"
                    name="ciudad"
                    onChange={datosBusqueda}
                    value={ciudad}
                />
              </div>
              <div className="campo">
                  <label htmlFor="pais">País</label>
                  <select
                    id="pais"
                    name="pais"
                    onChange={datosBusqueda}
                    value={pais}
                  >
                  <option value=""> Seleccione un país</option>
                  <option value="US">Estado Unidos</option>
                  <option value="MX">México</option>
                  <option value="AR">Argentina</option>
                  <option value="CO">Colombia</option>
                  <option value="CR">Costa Rica</option>
                  <option value="PE">Perú</option>
                  </select>
              </div>
              <input
                type="submit"
                value="Consultar Clima"
              />
          </form>
        </div>
    );
};

export default Formulario;