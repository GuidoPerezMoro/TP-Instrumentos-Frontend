import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "./CardInstrumento.module.css";
import { Instrumento } from "../../../types/Instrumento";

interface CardInstrumentoProps {
  instrumento: Instrumento;
}

export const CardInstrumento: React.FC<CardInstrumentoProps> = ({
  instrumento,
}) => {
  const navigate = useNavigate();

  const handleViewDetail = () => {
    navigate(`/producto/${instrumento.id}`);
  };

  const envioInfo =
    instrumento.costoEnvio === "G" ? (
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
    );

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
            {envioInfo}
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
            <Button variant="primary" className={styles.cartButton}>
              <span className="material-symbols-outlined">shopping_cart</span>{" "}
              Agregar al carrito
            </Button>
          </div>
        </Card.Body>
      </div>
    </Card>
  );
};
