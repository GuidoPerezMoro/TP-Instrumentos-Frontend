import styles from "./DondeEstamos.module.css";

export const DondeEstamos = () => {
  return (
    <div className={styles.dondeEstamosContainer}>
      <h1 className={styles.dondeEstamosTitle}>¿Dónde estamos?</h1>
      <div className={styles.mapContainer}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3350.4482399602807!2d-68.84085262344362!3d-32.886315168845535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e091ed2dd83f7%3A0xf41c7ab7e3522157!2sAv.%20San%20Mart%C3%ADn%20%26%20Av.%20Las%20Heras%2C%20Capital%2C%20Mendoza!5e0!3m2!1ses!2sar!4v1714677976857!5m2!1ses!2sar"
          width="100%"
          height="450"
          title="Mapa de la ubicación"
        ></iframe>
      </div>
    </div>
  );
};
