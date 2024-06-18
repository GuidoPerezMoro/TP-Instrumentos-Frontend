import { FC } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PieChart from "../../components/ui/Charts/PieChart/PieChart";
import BarsChart from "../../components/ui/Charts/BarsChart/BarsChart";
import styles from "./Estadisticas.module.css";

const Estadisticas: FC = () => {
  return (
    <Box className={styles.container}>
      <Box className={styles.titleContainer}>
        <Typography variant="h4" gutterBottom>
          Estadísticas de Venta de Instrumentos
        </Typography>
      </Box>
      <Box className={styles.chartsContainer}>
        <Box className={styles.chartBox}>
          <PieChart />
        </Box>
        <Box className={styles.divider}></Box>
        <Box className={styles.chartBox}>
          <BarsChart />
        </Box>
      </Box>
    </Box>
  );
};

export default Estadisticas;
