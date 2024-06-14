import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./ProductoDetalle.module.css";
import { Instrumento } from "../../types/Instrumento";
import { Image } from "react-bootstrap";
import { getOneInstrumento } from "../../services/instrumentoApi";
import { useCarrito } from "../../hooks/useCarrito";

export const ProductoDetalle = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { cart, addCarrito, removeCarrito, removeItemCarrito } = useCarrito();
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

  const handleAddToCart = () => {
    if (instrumento) {
      addCarrito({ ...instrumento, cantidad: 1 });
      setIsInCart(true);
    }
  };

  const handleRemoveFromCart = () => {
    if (instrumento) {
      removeCarrito(instrumento);
      setIsInCart(false);
    }
  };

  const handleRemoveItemFromCart = () => {
    if (instrumento) {
      removeItemCarrito(instrumento);
    }
  };

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

        {isInCart ? (
          <div className={styles.cartControls}>
            <Button variant="danger" onClick={handleRemoveFromCart}>
              <span className="material-symbols-outlined">
                shopping_cart_off
              </span>{" "}
              Remover del carrito
            </Button>
            <Form.Control
              type="number"
              min={0}
              value={
                cart.find((item) => item.id === instrumento.id)?.cantidad || 0
              }
              readOnly
            />
            <Button variant="secondary" onClick={handleRemoveItemFromCart}>
              <span className="material-symbols-outlined">
                keyboard_arrow_down
              </span>
            </Button>
            <Button variant="secondary" onClick={handleAddToCart}>
              <span className="material-symbols-outlined">
                keyboard_arrow_up
              </span>
            </Button>
          </div>
        ) : (
          <Button
            className={styles.button}
            variant="primary"
            onClick={handleAddToCart}
          >
            <span className="material-symbols-outlined">shopping_cart</span>{" "}
            Agregar al carrito
          </Button>
        )}
      </div>
    </div>
  );
};
