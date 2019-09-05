import React, {Component} from 'react';

class SetGoal extends Component {

    render(){
        return(
            <section className="set-goal">
                <div>
                    <p>What is your goal?</p>
                    <input type="text"/>
                </div>
                <div>
                    <p>How many times per week?</p>
                    <select>
                        <option value="1">Once</option>
                        <option value="2">Twice</option>
                        <option value="3">Three times</option>
                        <option value="4">Four times</option>
                        <option value="5">Five times</option>
                        <option value="6">Six times</option>
                        <option value="7">Seven times</option>
                    </select> 
                </div>
            </section>    
        );
    }

}

export default SetGoal;