// CartButtons.tsx
import { FC, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import styles from "./CartButtons.module.css";
import { Instrumento } from "../../../types/Instrumento";
import { useCarrito } from "../../../hooks/useCarrito";
import CartInstrumento from "../../../types/CartInstrumento";

interface CartButtonsProps {
  instrumento: Instrumento;
}

export const CartButtons: FC<CartButtonsProps> = ({ instrumento }) => {
  const { cart, addToCart, removeFromCart, decrementCartItem } = useCarrito();
  const [isInCart, setIsInCart] = useState<boolean>(false);

  useEffect(() => {
    setIsInCart(cart.some((item) => item.id === instrumento.id));
  }, [cart, instrumento.id]);

  const handleAddToCart = async () => {
    try {
      if (isInCart) {
        const item = cart.find((item) => item.id === instrumento.id);
        if (item) {
          addToCart(item);
          console.log(item.cantidad);
        } else console.log("Esto no debería pasar nunca");
      } else {
        const newItem: CartInstrumento = {
          ...instrumento,
          cantidad: 1,
        };
        addToCart(newItem);
        console.log(newItem.cantidad);
      }
      setIsInCart(true);
    } catch (error) {
      console.log("Error al agregar al carrito:", error);
    }
  };

  const handleRemoveFromCart = async () => {
    try {
      if (isInCart) {
        const item = cart.find((item) => item.id === instrumento.id);
        if (item) {
          removeFromCart(item);
          setIsInCart(false);
        }
      }
    } catch (error) {
      console.log("Error al remover del carrito:", error);
    }
  };

  const handleDecrementCartItem = async () => {
    try {
      if (isInCart) {
        const item = cart.find((item) => item.id === instrumento.id);
        if (item) {
          decrementCartItem(item);
          if (item.cantidad === 0) setIsInCart(false);
        }
      }
    } catch (error) {
      console.error("Error al manejar la cantidad del carrito:", error);
    }
  };

  return (
    <div id="cart">
      {!isInCart ? (
        <div id="buttonAgregarAlCarrito" className={styles.cartAddButton}>
          <Button variant="primary" onClick={handleAddToCart}>
            <span className="material-symbols-outlined">add_shopping_cart</span>{" "}
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
                cart.find((item) => item.id === instrumento.id)?.cantidad || 0
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
  );
};
