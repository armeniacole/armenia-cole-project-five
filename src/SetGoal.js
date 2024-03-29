import React, {Component} from 'react';

import firebase from './firebase';

class SetGoal extends Component {
    pushToFirebase = (event) => {
        event.preventDefault();
        this.props.toggleHidden();

        // const selected = Number(event.target.value);

        // if (typeof (selected) === "number") {
        //     this.props.goalState = selected;
        // }
        
        
        
        const dbRef = firebase.database().ref(this.props.user ? `users/${this.props.userID}/goal` : `goal`);
        dbRef.set({
            number: this.props.goalState,
            activity: this.props.goalString
        });

        firebase.database().ref(this.props.user ? `users/${this.props.userID}/tracker` : `tracker`);
        dbRef.update({
            tracker: [[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]],
        });
    };

    render(){
        
        const isEnabled = this.props.goalString.length > 0;
        
        return(
            
            <section className="goals">
                <form onSubmit={this.pushToFirebase} action="" className="set-goal">
                    <fieldset>
                        <legend>Update Goal</legend>
                        <div>
                            <p>What activity is your goal for?</p>
                            <input 
                                name="userGoal"
                                type="text"
                                onChange={this.props.updateGoal}
                            />
                            {!isEnabled ? <p>Please set a goal</p> : null}
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
                        <label className="save-label" htmlFor="save"><span className="visually-hidden">Save Goal</span> Warning: Clicking this button will erase your previous tracker data. Click set/update to escape.</label>
                        <button disabled={!isEnabled} name="save">Save Goal</button>
                    </fieldset>
                </form>  
                <div>
                    <p>Your goal is to {this.props.goalString} {this.props.goalState} times a week!</p>
                </div>  
            </section>
        );
    }

}

export default SetGoal;