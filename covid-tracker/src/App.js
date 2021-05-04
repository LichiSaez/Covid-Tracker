import React from "react";
import { Cards, Cuadros, CountryPicker } from "./components";
import styles from './App.module.css';

class App extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <Cards />
        <Cuadros />
        <CountryPicker />
      </div>
    );
  }
}

export default App;
