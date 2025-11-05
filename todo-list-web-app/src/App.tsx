import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ToDoList } from './components/ToDoListComponent/ToDoList';

function App() {
  return (
    <div className='App-container'>
      <ToDoList/>
    </div>
  );
}

export default App;
