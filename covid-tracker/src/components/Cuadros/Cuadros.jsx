import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";
import styles from "./Cuadros.module.css";

const Cuadros = () => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const traerAPI = async () => {
      setDailyData(await fetchDailyData());
    };

    traerAPI();
  });

  const cuadroLinear = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: "Infectados",
            borderColor: "#3333ff",
            fill: true,
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            label: "Infectados",
            borderColor: "red",
            backgroundColor: "rgba(255,0,0,0.5",
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  return <div className={styles.container}>{cuadroLinear}</div>;
};

export default Cuadros;
