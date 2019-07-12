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
      {/*
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
  */}
    </div>
  );
}

export default App;
