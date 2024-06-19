// CheckoutMP.tsx
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import styles from "./CheckoutMp.module.css";
import { createPreferenceMP } from "../../services/MercadoPagoApi";
import { useCarrito } from "../../hooks/useCarrito"; // Importamos el hook useCarrito
import { createPedido } from "../../services/PedidoApi"; // Importamos el servicio para crear el pedido

// Lee la clave pública desde la variable de entorno
const MP_PUBLIC_KEY = import.meta.env.VITE_MP_PUBLIC_KEY;

function CheckoutMP({ montoCarrito = 0 }) {
  const { cart } = useCarrito(); // Usamos el hook useCarrito para obtener el carrito y la función para limpiarlo
  const [idPreference, setIdPreference] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPaymentButton, setShowPaymentButton] = useState<boolean>(false); // Estado para controlar la visibilidad del botón de Wallet

  const handlePreferenceResponse = async (response: any) => {
    console.log("Preference id: " + response.id);
    setIdPreference(response.id);
    setLoading(false);
    setShowPaymentButton(true); // Mostrar el botón de Wallet después de obtener la preferencia
  };

  const handlePagoClick = async () => {
    if (montoCarrito > 0 && cart.length > 0) {
      setLoading(true);

      // Crear los detalles del pedido a partir del carrito
      const detallesPedido = cart.map((item) => ({
        id: 0, // Asignamos un id temporal (puede ser opcional)
        cantidad: item.cantidad,
        instrumento: {
          id: item.id,
          instrumento: item.instrumento,
          marca: item.marca,
          modelo: item.modelo,
          imagen: item.imagen,
          precio: item.precio,
          costoEnvio: item.costoEnvio,
          cantidadVendida: item.cantidadVendida,
          descripcion: item.descripcion,
          categoria: item.categoria,
        },
      }));

      // Crear el objeto pedido
      const pedido = {
        id: 0, // Asignamos un id temporal (puede ser opcional)
        titulo: "Pedido Instrumentos",
        fecha: new Date(),
        totalPedido: montoCarrito,
        detallesPedido: detallesPedido,
      };

      try {
        // Crear el pedido en el backend
        const createdPedido = await createPedido(pedido);

        // Obtener la preferencia de MercadoPago
        const response = await createPreferenceMP(createdPedido);
        handlePreferenceResponse(response);
      } catch (error) {
        console.error("Error creating preference:", error);
        setLoading(false);
      }
    } else {
      alert("Agregue al menos un producto al carrito");
    }
  };

  // Inicializa MercadoPago con la clave pública desde la variable de entorno
  initMercadoPago(MP_PUBLIC_KEY, {
    locale: "es-AR",
  });

  // redirectMode es optativo y puede ser self, blank o modal
  return (
    <div className={styles.checkoutContainer}>
      <div
        className={
          idPreference || loading ? styles.divInvisible : styles.divVisible
        }
      >
        <Button onClick={handlePagoClick} className={styles.buttonMercadoPago}>
          Proceder al pago
        </Button>
      </div>
      <div className={loading ? styles.divVisible : styles.divInvisible}>
        <div className={styles.loadingSpinner}></div>
      </div>
      <div
        className={
          idPreference && showPaymentButton
            ? styles.divVisible
            : styles.divInvisible
        }
      >
        {/* TODO: Implementar lógica para vaciar carrito luego de redigir a mercadopago */}
        <Wallet
          initialization={{ preferenceId: idPreference, redirectMode: "blank" }}
          customization={{ texts: { valueProp: "smart_option" } }}
        />
      </div>
    </div>
  );
}

export default CheckoutMP;
