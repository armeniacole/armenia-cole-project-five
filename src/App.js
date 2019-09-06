import React, {Component} from 'react';
import './App.scss';
import firebase from './firebase';
import SetGoal from './SetGoal';
import Counter from './Counter';
import Message from './Message';

class App extends Component {

  constructor(){
    super();
    this.state = {
      userGoal: '',
      goalAmount: 0,
      month: [[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]],
      total: "",
    }
  }

  handleChange = (event) => {
    // console.log(event.target.name);
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  componentDidMount() {
    const dbRef = firebase.database().ref();

    dbRef.on('value', (data) => {

      const dataBase = data.val();
      console.log(dataBase);
      const activity = dataBase.goal.activity;
      const number = dataBase.goal.number;
      const tracker = dataBase.tracker;
      // console.log(tracker)

      this.setState({
        userGoal: activity,
        goalAmount: number,
        month: tracker
      })

      const weekOne = this.addWeekly(this.state.month[0]);
      // console.log("weekOne", weekOne)
      
    });

  }

  trackerValue = (event, weekIndex, dayIndex) => {
    
    const copiedArray = [...this.state.month];

    const selected = Number(event.target.value);

    if (typeof(selected) === "number") {
      copiedArray[weekIndex][dayIndex] = selected;
    }
    // copiedArray[weekIndex][dayIndex] = event.target.value;
    
    this.setState({
      month: copiedArray
    })

    const dbRef = firebase.database().ref("tracker");

    dbRef.set(this.state.month)
  }

  handleClear = (event) => {
    event.preventDefault();

    this.setState({
      month: [[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]]
    })

    const dbRef = firebase.database().ref("tracker");
    dbRef.set(this.state.month);

  }

  addWeekly = (weekArray) => {
    const total = weekArray.reduce((total, integer) => {
      return total + integer
    })
    this.setState({
      total: total
    })
    // console.log(total)
  }
  
  render(){
    const progressMessage = (weekState) => {
      if (weekState == 0) {
        return 
      } else if (weekState < this.state.goalAmount) {
        return <p>You have {this.state.goalAmount - weekState} more time(s) reach this weeks goal</p>
      } else if (weekState == this.state.goalAmount) {
        return <p>Congrats! You have meet your goal for this week!</p>
      } else if (weekState > this.state.goalAmount) {
        return <p>You have surpassed your goal!</p>
      } 
    }

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
        <section className="tracker">
          <p>Monday</p>
          <p>Tuesday</p>
          <p>Wednesday</p>
          <p>Thursday</p>
          <p>Friday</p>
          <p>Saturday</p>
          <p>Sunday</p>

          {
            this.state.month.map((week, weekIndex) => {
              return(
                week.map((day, dayIndex) => {
                  return <Counter 
                            key={weekIndex+dayIndex}
                            dayIndex={dayIndex}
                            weekIndex={weekIndex}
                            trackerFunction={this.trackerValue}
                            value={this.state.month[weekIndex][dayIndex]}
                          />
                })
              )
            })

          }
          <button onClick={this.handleClear}>Clear Tracked Data</button>
        </section>
        {/* <Message 
          addWeekly={this.addWeekly}
          goalState={this.state.goalAmount}
          month={this.state.month}
        /> */}
        <p>Week One: {progressMessage(this.state.total)}</p>
        <p>Week Two: {progressMessage()}</p>
        <p>Week Three: {progressMessage()}</p>
        <p>Week Four: {progressMessage()}</p>
      </div>
    );
  }
}

export default App;
