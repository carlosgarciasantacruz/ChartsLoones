import React from 'react';
import './App.css';
import AppBarComponent from "./components/app-bar";
import Dashboard from './components/dashboard';

function App() {
  return (
    <div className="App">
      {/* App Bar Component */}
      <AppBarComponent></AppBarComponent>
      <Dashboard></Dashboard>
    </div>
  );
}

export default App;
