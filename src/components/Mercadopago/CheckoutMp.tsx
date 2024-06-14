// CheckoutMP.tsx
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import "./CheckoutMp.css";
import { PreferenceMp } from "../../types/PreferenceMp";
import { createPreferenceMP } from "../../services/MercadoPagoApi";

// Lee la clave pública desde la variable de entorno
const MP_PUBLIC_KEY = import.meta.env.VITE_MP_PUBLIC_KEY;

function CheckoutMP({ montoCarrito = 0 }) {
  const [idPreference, setIdPreference] = useState<string>("");

  const getPreferenceMP = async () => {
    if (montoCarrito > 0) {
      const response: PreferenceMp = await createPreferenceMP({
        id: 0,
        titulo: "Pedido Instrumentos",
        fecha: new Date(),
        totalPedido: montoCarrito,
        detalle: {
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
            cantidad: 0,
          },
        },
      });
      console.log("Preference id: " + response.id);
      if (response) setIdPreference(response.id);
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
    <div>
      <div className={idPreference ? "divInvisible" : "divVisible"}>
      <Button
        onClick={getPreferenceMP}
        className="btMercadoPago"
        style={{ marginLeft: "auto" }}
      >
        Proceder al pago
      </Button>
      </div>
      <div className={idPreference ? "divVisible" : "divInvisible"}>
        <Wallet
          initialization={{ preferenceId: idPreference, redirectMode: "blank" }}
          customization={{ texts: { valueProp: "smart_option" } }}
        />
      </div>
    </div>
  );
}

export default CheckoutMP;
