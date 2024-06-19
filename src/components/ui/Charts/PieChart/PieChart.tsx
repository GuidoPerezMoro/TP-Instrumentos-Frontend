// PieChart.tsx
import { useState, useEffect, FC } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import styles from "./PieChart.module.css"; // Importar los estilos
import { Instrumento } from "../../../../types/Instrumento";
import { getAllInstrumentos } from "../../../../services/instrumentoApi";

// Define colors for the pie chart
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AF19FF",
  "#FF4560",
  "#FFBC32",
  "#32CD32",
  "#FF5733",
  "#C70039",
];

const CustomPieChart: FC = () => {
  const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);
  const [numToShow, setNumToShow] = useState<number>(5);

  useEffect(() => {
    getAllInstrumentos()
      .then((data) => {
        setInstrumentos(data);
      })
      .catch((error) => {
        console.error("Error al obtener los instrumentos:", error);
      });
  }, []);

  const sortedData = instrumentos
    .sort((a, b) => b.cantidadVendida - a.cantidadVendida)
    .slice(0, numToShow);
  const totalSales = sortedData.reduce(
    (acc, item) => acc + item.cantidadVendida,
    0
  );
  const pieData = sortedData.map((item) => ({
    name: item.instrumento,
    value: item.cantidadVendida,
    percentage: ((item.cantidadVendida / totalSales) * 100).toFixed(2),
  }));

  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    setNumToShow(newValue as number);
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.chartContainer}>
        <PieChart width={400} height={400}>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            label={({ name, percentage }) => `${name}: ${percentage}%`}
          >
            {pieData.map((_entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number, name: string) => [`${value}`, `${name}`]}
          />
        </PieChart>
        <Box className={styles.sliderContainer}>
          <Typography gutterBottom>Instrumentos a mostrar</Typography>
          <Slider
            value={numToShow}
            onChange={handleSliderChange}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={1}
            marks
            min={2}
            max={10}
          />
        </Box>
      </Box>
      <Box className={styles.legendContainer}>
        {sortedData.map((item, index) => (
          <Box
            key={`legend-${index}`}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "5px",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                backgroundColor: COLORS[index % COLORS.length],
                marginRight: "5px",
              }}
            ></div>
            <Typography variant="body1">{`${item.instrumento}: ${item.cantidadVendida}`}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CustomPieChart;
