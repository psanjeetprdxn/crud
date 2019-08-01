import React from 'react';
import logo from './logo.svg';
import './App.css';
import Todo from './Component/Todo';
import Dictonary from './Component/Dictonary';

function App() {
  return (
    <div className="App">
      <Todo />
      <Dictonary />
    </div>
  );
}

export default App;
