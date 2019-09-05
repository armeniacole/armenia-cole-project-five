import React, {Component} from 'react';
import './App.scss';
import firebase from './firebase';
import SetGoal from './SetGoal';
import Tracker from './Tracker';
import Message from './Message';

class App extends Component {
  render(){

    return (
      <div className="App">
        <header>
          <h1>Name of App</h1>
        </header>
        <SetGoal/>
        <p>some instructions</p>
        <Tracker/>
        <Message/>
      </div>
    );
  }
}

export default App;
