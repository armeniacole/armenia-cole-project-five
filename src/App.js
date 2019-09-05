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
      monOne: 0

    }
  }

  handleChange = (event) => {
    // console.log(event.target.name);
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  componentDidMount() {
    const dbRef = firebase.database().ref("goal");

    dbRef.on('value', (data) => {

      const goal = data.val();

      const activity = goal.activity;
      const number = goal.number;

      console.log(goal)
      console.log(activity)
      console.log(number)

      this.setState({
        userGoal: activity,
        goalAmount: number
      })


    });
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
        <Tracker monOneState={this.state.monOne}/>
        <Message/>
      </div>
    );
  }
}

export default App;
