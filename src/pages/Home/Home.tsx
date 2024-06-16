import { Button } from "react-bootstrap";
import styles from "./Home.module.css";
import { useCarrito } from "../../hooks/useCarrito";

export const Home = () => {
  const { clearCart } = useCarrito();
  return (
    <div className={styles.homeContainer}>
      <h1>Armonía Melódica</h1>
      <img
        src="public/assets/images/home.jpg"
        alt="Imagen de la tienda"
        className={styles.storeImage}
      />
      <p>
        Armonía Melódica es tu destino definitivo para explorar el mundo de la
        música. Desde guitarras eléctricas hasta pianos de cola, nuestra tienda
        ofrece una amplia gama de instrumentos musicales de alta calidad para
        satisfacer las necesidades de músicos aficionados y profesionales por
        igual. Con un equipo apasionado de expertos en música, estamos aquí para
        brindarte asesoramiento personalizado y ayudarte a encontrar el
        instrumento perfecto que se adapte a tu estilo y preferencias musicales.
        Además de nuestra selección de instrumentos, también ofrecemos una
        variedad de accesorios, equipos de sonido y servicios de reparación para
        garantizar que tu experiencia musical sea siempre excepcional. En
        Armonía Melódica, nos comprometemos a inspirar tu creatividad y a ser tu
        compañero de confianza en tu viaje musical. ¡Únete a nosotros y deja que
        la música te lleve a nuevas alturas!
      </p>
      <Button onClick={clearCart}>Clear</Button>
    </div>
  );
};
