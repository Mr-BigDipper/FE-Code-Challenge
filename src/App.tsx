import React from 'react';
import { useTheme } from "@mui/material/styles";

import Home from './pages/Home/Home';
import RouterCom from './Router';
import Header from "./components/Header/Header";
import './App.css';

function App() {
  const theme: any = useTheme();
  console.log(theme)
  return (
    <div className="App" style={{ background: theme.palette.pageBackground}}>
      <Header />
      <RouterCom />
    </div>
  );
}

export default App;
