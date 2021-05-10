import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";
import styles from "./Cuadros.module.css";

const Cuadros = ({ data:{confirmed, recovered, deaths}, country }) => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const traerAPI = async () => {
      setDailyData(await fetchDailyData());
    };

    traerAPI();
  }, []);

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
            label: "Muertos",
            borderColor: "red",
            backgroundColor: "rgba(255,0,0,0.5",
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  const cuadroBarras = (
    confirmed ? <Bar 
      data={{
        labels: ['Infectados', 'Recuperados', 'Muertos'],
        datasets: [{
          data: [confirmed.value, recovered.value, deaths.value],
          backgroundColor: [
            'rgba(23, 23, 216, 0.5)',
            'rgba(23, 216, 39, 0.5)',
            'rgba(231, 44, 11, 0.5)'
          ],
        }]
      }}
      options={{
        legend: {display:false},
        title: {display:true, text:`Current state in ${country}`},
      }}
    /> : null
  );

  return <div className={styles.container}>{country ? cuadroBarras : cuadroLinear}</div>;
};

export default Cuadros;
