import { FC } from "react";
import styles from "./GenerateExcel.module.css";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { downloadPedidosExcel } from "../../services/PedidoApi";

type GenerateExcelProps = {
  startDate: string;
  endDate: string;
};

const GenerateExcel: FC<GenerateExcelProps> = ({ startDate, endDate }) => {
  const handleDownload = async () => {
    if (!startDate || !endDate) {
      alert("Por favor, selecciona ambas fechas.");
      return;
    }
    try {
      await downloadPedidosExcel(startDate, endDate);
      //alert("Excel file downloaded successfully");
    } catch (error) {
      alert("Failed to download Excel file");
    }
  };

  return (
    <button className={styles.generateExcelButton} onClick={handleDownload}>
      <FileDownloadIcon className={styles.icon} />
      Descargar Excel
    </button>
  );
};

export default GenerateExcel;
