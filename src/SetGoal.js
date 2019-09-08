import React, {Component} from 'react';

import firebase from './firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons'


class SetGoal extends Component {
    constructor(props) {
        super(props)
        this.state={};
    }
    pushToFirebase = (event) => {
        event.preventDefault();
        this.props.toggleHidden();

        // const selected = Number(event.target.value);

        // if (typeof (selected) === "number") {
        //     this.props.goalState = selected;
        // }

        console.log(this.props.user)
        const dbRef = firebase.database().ref(this.props.user ? `users/${this.props.user.uid}/goal` : `goal`);
        dbRef.set({
            number: this.props.goalState,
            activity: this.props.goalString
        });
    };

    render(){

        return(
            
            <section className="goals">
                <form onSubmit={this.pushToFirebase} action="" className="set-goal">
                    <fieldset>
                        {/* <legend>Update Goal</legend> */}
                        <div>
                            <label htmlFor="userGoal">What activity is your goal for?</label>
                            {/* <p>What activity is your goal for?</p> */}
                            <input 
                                name="userGoal"
                                type="text"
                                placeholder="eg: go for a run"
                                onChange={this.props.updateGoal}
                            />
                        </div>
                        <div>
                            <div className="select-container">
                                <label htmlFor="goalAmount">How many times per week?</label>
                                {/* <p>How many times per week?</p> */}
                                <FontAwesomeIcon icon={faSortDown} className="goal-select-arrow" />
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
                        </div>
                        <button >Save Goal</button>
                    </fieldset>
                </form>  
            </section>
        );
    }

}

export default SetGoal;