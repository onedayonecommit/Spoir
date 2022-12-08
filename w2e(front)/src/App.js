import './App.css';
import { Reset } from 'styled-reset';
import * as React from 'react'
import Nav from './components/Nav';
function App() {
  return (
    <React.Fragment>
      <Reset />
      <div className="App">
        <Nav />
      </div>
    </React.Fragment>
  );
}

export default App;
