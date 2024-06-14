// CardInstrumento.tsx
import { FC, useState, useEffect } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "./CardInstrumento.module.css";
import { Instrumento } from "../../../types/Instrumento";
import { useCarrito } from "../../../hooks/useCarrito";

interface CardInstrumentoProps {
  instrumento: Instrumento;
}

export const CardInstrumento: FC<CardInstrumentoProps> = ({ instrumento }) => {
  const navigate = useNavigate();
  const { cart, addCarrito, removeCarrito, removeItemCarrito } = useCarrito();
  const [isInCart, setIsInCart] = useState<boolean>(false); // Estado para controlar si el instrumento está en el carrito

  // Verificamos si el instrumento está en el carrito
  useEffect(() => {
    setIsInCart(cart.some((item) => item.id === instrumento.id));
  }, [cart, instrumento.id]);

  const handleViewDetail = () => {
    navigate(`/producto/${instrumento.id}`);
  };

  const handleAddToCart = () => {
    addCarrito(instrumento);
    setIsInCart(true);
  };

  const handleRemoveFromCart = () => {
    removeCarrito(instrumento);
    setIsInCart(false);
  };

  const handleRemoveItemFromCart = () => {
    removeItemCarrito(instrumento);
  };

  return (
    <Card className={styles.cardInstrumento}>
      <div className={styles.cardContent}>
        <div className={styles.imageContainer}>
          <Card.Img
            className={styles.instrumentImage}
            src={instrumento.imagen}
          />
        </div>
        <Card.Body className={styles.cardBody}>
          <Card.Title>{instrumento.instrumento}</Card.Title>
          <Card.Text>
            Marca: {instrumento.marca}
            <br />
            Modelo: {instrumento.modelo}
            <br />
            Precio: ${instrumento.precio}
            <br />
            {instrumento.costoEnvio === "G" ? (
              <div className={styles.envioGratis}>
                <span className={`material-symbols-outlined ${styles.icon}`}>
                  local_shipping
                </span>
                Envío gratis
              </div>
            ) : (
              <div className={styles.envioCosto}>
                <span className={`material-symbols-outlined ${styles.icon}`}>
                  local_shipping
                </span>
                Costo de envío: ${instrumento.costoEnvio}
              </div>
            )}
            <br />
            {instrumento.descripcion}
          </Card.Text>
          <div className={styles.buttonsContainer}>
            <Button
              variant="primary"
              onClick={handleViewDetail}
              className={styles.detailButton}
            >
              <span className="material-symbols-outlined">info</span> Ver
              Detalle
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
                    cart.find((item) => item.id === instrumento.id)?.cantidad ||
                    0
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
                variant="primary"
                onClick={handleAddToCart}
                className={styles.cartButton}
              >
                <span className="material-symbols-outlined">
                  add_shopping_cart
                </span>{" "}
                Agregar al carrito
              </Button>
            )}
          </div>
        </Card.Body>
      </div>
    </Card>
  );
};
