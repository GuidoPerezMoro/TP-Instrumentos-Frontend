import { FC, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import BarsChart from "../../components/ui/Charts/BarsChart/BarsChart";
import styles from "./Estadisticas.module.css";
import PieChartPedidosXInstrumento from "../../components/ui/Charts/PieChart/PieChartPedidosXInstrumento/PieChartPedidosXInstrumento";
import PieChartInstrumentosVendidos from "../../components/ui/Charts/PieChart/PieChartInstrumentosVendidos/PieChartInstrumentosVendidos";

const Estadisticas: FC = () => {
  const [selectedChart, setSelectedChart] = useState<string>("chartPedidos");

  const handleChartChange = (event: SelectChangeEvent<string>) => {
    setSelectedChart(event.target.value as string);
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.titleContainer}>
        <Typography variant="h4" gutterBottom>
          Estadísticas de ventas
        </Typography>
      </Box>
      <Box className={styles.chartsContainer}>
        <Box className={styles.chartSection}>
          <Box className={styles.selectContainer}>
            <Select
              value={selectedChart}
              onChange={handleChartChange}
              displayEmpty
              inputProps={{ "aria-label": "Seleccionar gráfico" }}
              className={styles.select}
            >
              <MenuItem value="chartPedidos">
                Pedidos vendidos por instrumento
              </MenuItem>
              <MenuItem value="chartInstrumentos">
                Instrumentos vendidos
              </MenuItem>
            </Select>
          </Box>
          <Box className={styles.chartBox}>
            {selectedChart === "chartPedidos" ? (
              <PieChartPedidosXInstrumento />
            ) : (
              <PieChartInstrumentosVendidos />
            )}
          </Box>
        </Box>
        <Box className={styles.divider}></Box>
        <Box className={styles.chartSection}>
          <Box className={styles.chartBox}>
            <BarsChart />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Estadisticas;
