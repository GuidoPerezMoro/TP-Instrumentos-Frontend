import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./ProductoDetalle.module.css";
import { getOneInstrumento } from "../../services/funcionesApi";
import { Instrumento } from "../../types/Instrumento";
import { Image } from "react-bootstrap";

export const ProductoDetalle = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [instrumento, setInstrumento] = useState<Instrumento | null>(null);

  useEffect(() => {
    if (id) {
      getOneInstrumento(Number(id)).then((data) => {
        setInstrumento(data);
      });
    }
  }, [id]);

  const handleAddToCart = () => {
    // Agregar lógica para agregar al carrito
  };

  if (!instrumento) {
    return <div>Cargando...</div>;
  }

  return (
    <div className={styles.productoDetalleContainer}>
      <h2 className={styles.instrumentTitle}>{instrumento.instrumento}</h2>
      <Image
        className={styles.instrumentImage}
        src={`/assets/images/Instrumentos/${instrumento.imagen}`}
        alt={instrumento.instrumento}
        fluid
      />
      <div className={styles.detalleContainer}>
        <p className={styles.instrumentDescription}>
          {instrumento.descripcion}
        </p>
        <p>
          <b>Marca: </b>
          {instrumento.marca}
        </p>
        <p>
          <b>Modelo: </b>
          {instrumento.modelo}
        </p>
        <p>
          <b>Precio: </b> ${instrumento.precio}
        </p>
        <p className={styles.envio}>
          {instrumento.costoEnvio === "G"
            ? "Envíos gratis a todo el país"
            : `Costo de Envío: $${instrumento.costoEnvio}`}
        </p>
        <p className={styles.cantidadVendida}>
          {instrumento.cantidadVendida} elementos vendidos
        </p>
      </div>
      <div className={styles.buttonsContainer}>
        <Button
          className={styles.button}
          variant="primary"
          onClick={() => navigate(-1)}
        >
          <span className="material-symbols-outlined">arrow_back</span> Volver
        </Button>
        <Button
          className={styles.button}
          variant="primary"
          onClick={handleAddToCart}
        >
          <span className="material-symbols-outlined">shopping_cart</span>
          Agregar al carrito
        </Button>
      </div>
    </div>
  );
};

export default ProductoDetalle;
