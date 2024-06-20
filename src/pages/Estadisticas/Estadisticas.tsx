import { FC, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import BarsChart from "../../components/ui/Charts/BarsChart/BarsChart";
import styles from "./Estadisticas.module.css";
import PieChart1 from "../../components/ui/Charts/PieChart1/PieChart1";
import PieChart2 from "../../components/ui/Charts/PieChart2/PieChart2";

const Estadisticas: FC = () => {
  const [selectedChart, setSelectedChart] = useState<string>("chart2");

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
              <MenuItem value="chart2">Gráfico de Torta 1</MenuItem>
              <MenuItem value="chart1">Gráfico de Torta 2</MenuItem>
            </Select>
          </Box>
          <Box className={styles.chartBox}>
            {selectedChart === "chart1" ? <PieChart1 /> : <PieChart2 />}
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
