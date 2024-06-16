// CardInstrumento.tsx
import { FC, useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "./CardInstrumento.module.css";
import { Instrumento } from "../../../types/Instrumento";
import { useCarrito } from "../../../hooks/useCarrito";
import { DetallePedido } from "../../../types/DetallePedido";
import { createDetallePedido } from "../../../services/DetallePedidoApi";

interface CardInstrumentoProps {
  instrumento: Instrumento;
}

export const CardInstrumento: FC<CardInstrumentoProps> = ({ instrumento }) => {
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart, decrementCartItem } = useCarrito();
  const [isInCart, setIsInCart] = useState<boolean>(false); // Estado para controlar si el instrumento está en el carrito

  // Verificamos si el instrumento está en el carrito
  useEffect(() => {
    setIsInCart(cart.some((item) => item.instrumento.id === instrumento.id));
  }, [cart, instrumento.id]);

  const handleViewDetail = () => {
    navigate(`/producto/${instrumento.id}`);
  };

  const handleAddToCart = async () => {
    try {
      if (isInCart) {
        // Si isInCart es true, significa que el instrumento está en el carrito
        const detallePedidoExistente = cart.find(
          (detalle) => detalle.instrumento.id === instrumento.id
        );

        if (detallePedidoExistente) {
          // Si ya existe un detalle, simplemente incrementamos la cantidad en uno
          addToCart(detallePedidoExistente);
          console.log(detallePedidoExistente.cantidad);
        } else console.log("Esto no debería pasar nunca");
      } else {
        // Si no existe un detalle previo para este instrumento, lo creamos
        const nuevoDetallePedido: DetallePedido = await createDetallePedido({
          instrumento: instrumento,
          cantidad: 1, // Agregamos una unidad inicial
        });
        addToCart(nuevoDetallePedido);
        console.log(nuevoDetallePedido.cantidad);
      }
      setIsInCart(true); // Actualizamos el estado isInCart
    } catch (error) {
      console.log("Error al agregar al carrito:", error);
      // Manejar el error de alguna manera apropiada
    }
  };

  const handleRemoveFromCart = async () => {
    try {
      if (isInCart) {
        // Si isInCart es true, significa que el instrumento está en el carrito
        const detallePedidoExistente = cart.find(
          (detalle) => detalle.instrumento.id === instrumento.id
        );

        if (detallePedidoExistente) {
          // Si encontramos el detalle, lo eliminamos del carrito
          removeFromCart(detallePedidoExistente);
          setIsInCart(false); // Actualizamos el estado isInCart
        }
      }
    } catch (error) {
      console.log("Error al remover del carrito:", error);
      // Manejar el error de alguna manera apropiada
    }
  };

  const handleDecrementCartItem = async () => {
    try {
      if (isInCart) {
        // Si isInCart es true, significa que el instrumento está en el carrito
        const detallePedidoExistente = cart.find(
          (detalle) => detalle.instrumento.id === instrumento.id
        );

        if (detallePedidoExistente) {
          // Simplemente llamamos a la función del hook para manejar la cantidad
          decrementCartItem(detallePedidoExistente);
          if (detallePedidoExistente.cantidad === 0) setIsInCart(false);
        }
      }
    } catch (error) {
      console.error("Error al manejar la cantidad del carrito:", error);
      // Manejar el error de alguna manera apropiada
    }
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
            <div id="buttonVerDetalle" className={styles.detailButton}>
              <Button variant="primary" onClick={handleViewDetail}>
                <span className="material-symbols-outlined">info</span> Ver
                Detalle
              </Button>
            </div>

            <div id="cart">
              {!isInCart ? (
                <div
                  id="buttonAgregarAlCarrito"
                  className={styles.cartAddButton}
                >
                  <Button variant="primary" onClick={handleAddToCart}>
                    <span className="material-symbols-outlined">
                      add_shopping_cart
                    </span>{" "}
                    Agregar al carrito
                  </Button>
                </div>
              ) : (
                <div className={styles.buttonsContainer}>
                  <div id="buttonEliminarDelCarrito">
                    <Button variant="danger" onClick={handleRemoveFromCart}>
                      <span className="material-symbols-outlined">
                        shopping_cart_off
                      </span>
                    </Button>
                  </div>

                  <div id="buttonDecrease">
                    <Button
                      variant="secondary"
                      onClick={handleDecrementCartItem}
                      className={styles.cartButton}
                    >
                      <span className="material-symbols-outlined">
                        keyboard_arrow_down
                      </span>
                    </Button>
                  </div>

                  <div id="cantidadEnCarrito" className={styles.cartQuantity}>
                    <input
                      type="number"
                      min={0}
                      value={
                        cart.find(
                          (item) => item.instrumento.id === instrumento.id
                        )?.cantidad || 0
                      }
                      readOnly
                    />
                  </div>

                  <div id="buttonIncrease">
                    <Button
                      variant="secondary"
                      onClick={handleAddToCart}
                      className={styles.cartButton}
                    >
                      <span className="material-symbols-outlined">
                        keyboard_arrow_up
                      </span>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card.Body>
      </div>
    </Card>
  );
};
