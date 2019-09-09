import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './App.scss';
import firebase from './firebase';
import SetGoal from './SetGoal';
import Counter from './Counter';

const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

class App extends Component {

  constructor(){
    super();
    this.state = {
      userGoal: '',
      goalAmount: 0,
      month: [[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]],
      weekOne: "",
      weekTwo: "",
      weekThree: "",
      weekFour: "",
      isHidden: true,
      user: null
    }
    this.toggleHidden = this.toggleHidden.bind(this);
  }

  handleChange = (event) => {
    // console.log(event.target.name);
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  toggleHidden() {
    // console.log('stat', this.state);
    // console.log("toggle")
    this.setState({
      isHidden: !this.state.isHidden
    })
  }


  componentDidMount() {
    
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user }, () => {
          console.log(this.state.user.uid)
          // {this.state.user ? `users/${this.state.user.uid}` : ``}
          // {userIsLoggedIn ? <h1>Welcome, friend!</h1> : null}
          const dbRef = firebase.database().ref(this.state.user ? `users/${this.state.user.uid}` : ``);
          dbRef.on('value', (data) => {
      
            const dataBase = data.val();
            // console.log(dataBase);
            const activity = dataBase.goal.activity;
            const number = dataBase.goal.number;
            const tracker = dataBase.tracker;
      
            this.setState({
              userGoal: activity,
              goalAmount: number,
              month: tracker
            })
      
            this.addWeekly(this.state.month[0], "weekOne");
            this.addWeekly(this.state.month[1], "weekTwo");
            this.addWeekly(this.state.month[2], "weekThree");
            this.addWeekly(this.state.month[3], "weekFour");

          });

        });
      }
    });

    console.log(this.state.weekOne)
  }

  updateTracker = () => {
    const dbRef = firebase.database().ref(this.state.user ? `users/${this.state.user.uid}/tracker` : `tracker`);

    dbRef.set(this.state.month)
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
    },this.updateTracker)
  }




  handleClear = (event) => {
    event.preventDefault();

    this.setState({
      month: [[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]]
    },this.updateTracker)

  }




  addWeekly = (weekArray, weekState) => {
    const total = weekArray.reduce((total, integer) => {
      return total + integer
    })
    const name = weekState
    this.setState({
      [name]: total
    })
  
  }
  

  login = () => {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        });
      });
  }

  logout = () => {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
  }



  render(){
    
    
    const progressMessage = (weekState) => {
      if (weekState === 0) {
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
          <h1>(re)solution</h1>
          <button onClick={this.toggleHidden.bind(this)}>Set/Update Goal</button>
          {this.state.user ? <button onClick={this.logout}>Log Out</button> : <button onClick={this.login}>Log In</button>}
        </header>
        <div>
          <h2>Your goal is to <span>{this.state.userGoal}</span> : <span>{this.state.goalAmount}</span> times a week!</h2>
        </div>  
        {!this.state.isHidden && <SetGoal
          goalState={this.state.goalAmount}
          goalString={this.state.userGoal}
          updateGoal={this.handleChange}
          toggleHidden={this.toggleHidden}
          toggle={this.state.isHidden}
          user={this.state.user}
        />}
        
        <p className="instructions">Make your goal a habit! For each day you complete your activity select how many times. Check the progress section to see how you are doing.</p>
        <div className="flex-main">
          <section className="tracker">
            <p>Mon</p>
            <p>Tue</p>
            <p>Wed</p>
            <p>Thur</p>
            <p>Fri</p>
            <p>Sat</p>
            <p>Sun</p>
  
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
          </section>
  
          <section className="results">
          	<p><span>Week One:</span> {progressMessage(this.state.weekOne)}</p>
            <p><span>Week Two:</span> {progressMessage(this.state.weekTwo)}</p>
            <p><span>Week Three:</span> {progressMessage(this.state.weekThree)}</p>
            <p><span>Week Four:</span> {progressMessage(this.state.weekFour)}</p>
            <button onClick={this.handleClear}>Clear Tracked Data</button>
          </section>
        </div>
        {/* <button onClick={(event) => { if (window.confirm('Delete the item?')) { this.handleClear() }; }}>Clear Tracked Data</button> */}
      </div>
    );
  }
}

export default App;
