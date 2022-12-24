import Formulario from "./Formulario";
import Header from "./Header";
import Resultado from "./Resultado";
import Loading from "./Loading";
import useClima from "../hooks/useClima";

const AppClima = () => {
    const { resultado, cargando,sinResultado } = useClima();
    
    return (
       <>
         <Header />
         <main className="dos-columnas">
             <Formulario />
             {
                 cargando ? <Loading /> :
                 resultado?.name ?  <Resultado resultado={resultado} /> :
                 sinResultado ? <p>{sinResultado}</p> :
                 <p>El clima se va a mostrar aquí</p>
             }
         </main>
       </>
    );
};

export default AppClima;