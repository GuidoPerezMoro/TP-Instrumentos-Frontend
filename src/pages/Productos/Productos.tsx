import { useEffect, useState } from "react";
import { getAllInstrumentos } from "../../services/funcionesApi";
import { Instrumento } from "../../types/Instrumento";
import { ListInstrumentos } from "../../components/ui/ListInstrumentos/ListInstrumentos";

export const Productos = () => {
  const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getAllInstrumentos()
      .then((data) => {
        setInstrumentos(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los instrumentos:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Obteniendo instrumentos...</div>;
  }

  return (
    <ListInstrumentos
      instrumentos={instrumentos}
      title={"Lista de Instrumentos"}
    />
  );
};
