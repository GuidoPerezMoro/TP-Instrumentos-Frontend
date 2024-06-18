import { FC, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Slider, Box, Typography } from "@mui/material";
import styles from "./BarsChart.module.css";
import { getPedidosByMonthYear } from "../../../../services/PedidoApi";

interface PedidoData {
  [key: string]: number;
}

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

const BarsChart: FC = () => {
  const [data, setData] = useState<PedidoData | null>(null);
  const [months, setMonths] = useState<number>(6);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    getPedidosByMonthYear()
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  }, []);

  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    setMonths(newValue as number);
  };

  const processData = () => {
    if (!data) return [];

    const now = new Date();
    const filteredData = Object.entries(data)
      .filter(([key]) => {
        const [year, month] = key.split("-").map(Number);
        const date = new Date(year, month - 1);
        return date >= new Date(now.getFullYear(), now.getMonth() - months);
      })
      .map(([key, value]) => ({ date: key, orders: value }));

    return filteredData;
  };

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <Typography variant="h6" color="error">
          Lo sentimos. Hubo un error al conseguir los datos.
        </Typography>
        <span className={styles.sadFace}>:(</span>
      </div>
    );
  }

  return (
    <div className={styles.chartContainer}>
      <Typography variant="h6">Cantidad de pedidos por mes y año</Typography>

      {data ? (
        <>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={processData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill={COLORS[0]} />
            </BarChart>
          </ResponsiveContainer>
          <Box className={styles.sliderContainer}>
            <Typography variant="body1">Meses hacia atrás: {months}</Typography>
            <Slider
              value={months}
              onChange={handleSliderChange}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={1}
              marks
              min={1}
              max={24}
            />
          </Box>
        </>
      ) : (
        <Typography variant="h6">Cargando datos...</Typography>
      )}
    </div>
  );
};

export default BarsChart;
