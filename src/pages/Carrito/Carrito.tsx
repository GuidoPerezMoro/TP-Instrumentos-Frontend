import { FC } from "react";
import { Button, Table } from "react-bootstrap";
import "./../../styles/variables.css"; // Importa las variables primero
import styles from "./Carrito.module.css";
import { useCarrito } from "../../hooks/useCarrito";
import { Instrumento } from "../../types/Instrumento";
import CheckoutMP from "../../components/Mercadopago/CheckoutMp";

export const Carrito: FC = () => {
  const { cart, addCarrito, removeCarrito, removeItemCarrito } = useCarrito();

  const handleRemoveItem = (product: Instrumento) => {
    removeItemCarrito(product);
  };

  const handleRemoveAll = (product: Instrumento) => {
    removeCarrito(product);
  };

  const handleEmptyCart = () => {
    cart.forEach((item) => removeCarrito(item));
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
                <th>Acciones</th>
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
                    <input
                      type="number"
                      min={1}
                      value={item.cantidad}
                      onChange={(e) =>
                        addCarrito({
                          ...item,
                          cantidad: parseInt(e.target.value),
                        })
                      }
                    />
                  </td>
                  <td>${item.precio}</td>
                  <td>${item.precio * item.cantidad}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleRemoveItem(item)}
                    >
                      Eliminar Uno
                    </Button>{" "}
                    <Button
                      variant="danger"
                      onClick={() => handleRemoveAll(item)}
                    >
                      Eliminar Todos
                    </Button>
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
            <div>
              <CheckoutMP montoCarrito={calcularTotalCompra()}></CheckoutMP>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrito;
