import { FC } from "react";
import styles from "./GeneratePdf.module.css";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { downloadInstrumentoPdf } from "../../services/instrumentoApi";

interface GeneratePdfProps {
  id: number;
}

const GeneratePdf: FC<GeneratePdfProps> = ({ id }) => {
  const handleDownload = async () => {
    try {
      await downloadInstrumentoPdf(id);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  return (
    <button className={styles.button} onClick={handleDownload}>
      <PictureAsPdfIcon className={styles.icon} />
      Descargar PDF
    </button>
  );
};

export default GeneratePdf;
