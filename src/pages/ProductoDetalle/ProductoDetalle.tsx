import { useEffect, useState } from "react";
import { Button, Image } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./ProductoDetalle.module.css";
import { Instrumento } from "../../types/Instrumento";
import { getOneInstrumento } from "../../services/instrumentoApi";
import { useCarrito } from "../../hooks/useCarrito";
import { CartButtons } from "../../components/ui/CartButtons/CartButtons";

export const ProductoDetalle = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { cart } = useCarrito();
  const [instrumento, setInstrumento] = useState<Instrumento | null>(null);
  const [isInCart, setIsInCart] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      getOneInstrumento(Number(id)).then((data) => {
        setInstrumento(data);
        setIsInCart(cart.some((item) => item.id === data.id));
      });
    }
  }, [id, cart]);

  if (!instrumento) {
    return <div>Cargando...</div>;
  }

  return (
    <div className={styles.productoDetalleContainer}>
      <h2 className={styles.instrumentTitle}>{instrumento.instrumento}</h2>
      <Image
        className={styles.instrumentImage}
        src={instrumento.imagen}
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
        <CartButtons instrumento={instrumento} />{" "}
        {/* Utiliza el nuevo componente */}
      </div>
    </div>
  );
};
