// CheckoutMP.tsx
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import styles from "./CheckoutMp.module.css";
import { PreferenceMp } from "../../types/PreferenceMp";
import { createPreferenceMP } from "../../services/MercadoPagoApi";

// Lee la clave pública desde la variable de entorno
const MP_PUBLIC_KEY = import.meta.env.VITE_MP_PUBLIC_KEY;

function CheckoutMP({ montoCarrito = 0 }) {
  const [idPreference, setIdPreference] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const getPreferenceMP = async () => {
    if (montoCarrito > 0) {
      setLoading(true);
      const response: PreferenceMp = await createPreferenceMP({
        id: 0,
        titulo: "Pedido Instrumentos",
        fecha: new Date(),
        totalPedido: montoCarrito,
        detallesPedido: [
          {
            id: 0,
            cantidad: 0,
            instrumento: {
              id: 0,
              instrumento: "",
              marca: "",
              modelo: "",
              imagen: "",
              precio: 0,
              costoEnvio: "",
              cantidadVendida: "",
              descripcion: "",
              categoria: {
                id: 0,
                categoria: "",
              },
            },
          },
        ],
      });
      console.log("Preference id: " + response.id);
      if (response) {
        setTimeout(() => {
          setIdPreference(response.id);
          setLoading(false);
        }, 500);
      }
    } else {
      alert("Agregue al menos un plato al carrito");
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
        <Button onClick={getPreferenceMP} className={styles.buttonMercadoPago}>
          Proceder al pago
        </Button>
      </div>
      <div className={loading ? styles.divVisible : styles.divInvisible}>
        <div className={styles.loadingSpinner}></div>
      </div>
      <div className={idPreference ? styles.divVisible : styles.divInvisible}>
        <Wallet
          initialization={{ preferenceId: idPreference, redirectMode: "blank" }}
          customization={{ texts: { valueProp: "smart_option" } }}
        />
      </div>
    </div>
  );
}

export default CheckoutMP;
