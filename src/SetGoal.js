import React, {Component} from 'react';
import firebase from './firebase';

class SetGoal extends Component {
    pushToFirebase = (event) => {
        event.preventDefault();

        console.log(this.props.goalState);
        console.log(this.props.goalString);

        const dbRef = firebase.database().ref("goal");
        dbRef.set({
            number: this.props.goalState,
            activity: this.props.goalString
        });
    }

    render(){
        return(
            <form onSubmit={this.pushToFirebase} action="" className="set-goal">
                <div>
                    <p>What activity is your goal for?</p>
                    <input 
                        name="userGoal"
                        type="text"
                        onChange={this.props.updateGoal}
                    />
                </div>
                <div>
                    <p>How many times per week?</p>
                    <select 
                        name="goalAmount" 
                        onChange={this.props.updateGoal}
                    >
                        <option value="0">Chose an amount</option>
                        <option value="1">Once</option>
                        <option value="2">Twice</option>
                        <option value="3">Three times</option>
                        <option value="4">Four times</option>
                        <option value="5">Five times</option>
                        <option value="6">Six times</option>
                        <option value="7">Seven times</option>
                    </select> 
                </div>
                <button>Submit</button>
            </form>    
        );
    }

}

export default SetGoal;