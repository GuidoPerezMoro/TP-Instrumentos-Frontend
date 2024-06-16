import { FC } from "react";
import { Button, Table } from "react-bootstrap";
import "./../../styles/variables.css"; // Importa las variables primero
import styles from "./Carrito.module.css";
import { useCarrito } from "../../hooks/useCarrito";
import CheckoutMP from "../../components/Mercadopago/CheckoutMp";
import CartInstrumento from "../../types/CartInstrumento";

export const Carrito: FC = () => {
  const { cart, addToCart, removeFromCart, decrementCartItem, clearCart } =
    useCarrito();

  const handleAddToCart = (itemPedido: CartInstrumento) => {
    addToCart(itemPedido);
  };

  const handleRemoveAll = (itemPedido: CartInstrumento) => {
    removeFromCart(itemPedido);
  };

  const handleEmptyCart = () => {
    clearCart();
  };

  const calcularTotalCompra = () => {
    return cart.reduce((total, item) => total + item.precio * item.cantidad, 0);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Carrito de Compras</h2>
      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <div>
          <Table striped bordered hover className={styles.cartTable}>
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Instrumento</th>
                <th>Cantidad</th>
                <th>Precio Unitario</th>
                <th>Subtotal</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img
                      src={item.imagen}
                      alt={item.instrumento}
                      className={styles.thumbnail}
                    />
                  </td>
                  <td>{item.instrumento}</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Button
                        variant="outline-secondary"
                        onClick={() => decrementCartItem(item)}
                        className={styles.cartButton}
                      >
                        <span className="material-symbols-outlined">
                          keyboard_arrow_down
                        </span>
                      </Button>
                      <input
                        type="text"
                        value={item.cantidad}
                        readOnly
                        className={styles.cartInput}
                      />
                      <Button
                        variant="outline-secondary"
                        onClick={() => handleAddToCart(item)}
                        className={styles.cartButton}
                      >
                        <span className="material-symbols-outlined">
                          keyboard_arrow_up
                        </span>
                      </Button>
                    </div>
                  </td>
                  <td>${item.precio}</td>
                  <td>${item.precio * item.cantidad}</td>
                  <td>
                    <div id="buttonRemoveItem">
                      <Button
                        className={styles.buttonRemoveItem}
                        variant="danger"
                        onClick={() => handleRemoveAll(item)}
                      >
                        <span className="material-symbols-outlined">
                          shopping_cart_off
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className={styles.total}>
            Total de compra: ${calcularTotalCompra()}
          </div>
          <div className={styles.actions}>
            <div>
              <Button variant="secondary" onClick={handleEmptyCart}>
                Vaciar Carrito
              </Button>
            </div>
            <div id="Botón Mercadopago">
              <CheckoutMP montoCarrito={calcularTotalCompra()}></CheckoutMP>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrito;
