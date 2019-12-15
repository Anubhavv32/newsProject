import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import Mainbar from './components/mainbar';

function App() {
  return (
    <div className="App">
     <Router>
       <Route path="/" exact component={Mainbar}/>
       </Router> 

    </div>
  );
}

export default App;
