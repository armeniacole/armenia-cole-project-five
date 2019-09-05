import React, {Component} from 'react';
import './App.scss';
import firebase from './firebase';
import SetGoal from './SetGoal';
import Tracker from './Tracker';
import Message from './Message';

class App extends Component {

  constructor(){
    super();
    this.state = {
      userGoal: '',
      goalAmount: 0,

    }
  }

  handleChange = (event) => {
    // console.log(event.target.name);
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  render(){

    return (
      <div className="App">
        <header>
          <h1>Name of App</h1>
        </header>
        <SetGoal 
          goalState={this.state.goalAmount} 
          goalString={this.state.userGoal} 
          updateGoal={this.handleChange}
        />
        <p>some instructions</p>
        <Tracker/>
        <Message/>
      </div>
    );
  }
}

export default App;
