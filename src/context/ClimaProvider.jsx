import { useState, createContext } from "react";
import axios from 'axios';

const ClimaContext = createContext();

const ClimaProvider = ({children}) => {

    const [busqueda,setBusqueda] = useState({
       ciudad:'',
       pais:''
   });

   const [ resultado,setResultado ] = useState({});
   const [ cargando, setCargando ] = useState(false);
   const [ sinResultado, setSinResultado ] = useState(false);


   const datosBusqueda = e => {
      setBusqueda({
        ...busqueda,
        [e.target.name] : e.target.value
      });
   }

   const consultarClima = async datos => {
       setCargando(true)
       setSinResultado(false)
       try {
           const { ciudad , pais } = datos
           const appId =  import.meta.env.VITE_API_KEY;
           const url = `http://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&limit=1&appid=${appId}`;
           const { data } = await axios(url);
           const { lat, lon } = data[0];
           const urlClima = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`;
           const { data: clima } = await axios(urlClima);
           setResultado(clima)
       }catch (error){
           console.log('error');
           setResultado({})
           setSinResultado('No hay resultados');
       }

       setTimeout(() => {
          setCargando(false) 
       },1000);
   }

  return(
    <ClimaContext.Provider
      value={{
          busqueda,
          setBusqueda,
          datosBusqueda,
          consultarClima,
          resultado,
          cargando,
          sinResultado
      }}
    >
        {children}
    </ClimaContext.Provider>
  )
}

export {
    ClimaProvider
}

export default  ClimaContext