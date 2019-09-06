import React, {Component} from 'react';

class Message extends Component {
    


    // if (weeklyTimes < goal) {
    //     return `{} times till you meet this weeks goal`
    // } elseif (weeklyTimes === goal) {
    //     return `{} times! You met your goal this week!`
    // } elseif (weeklyTimes > goal) {
    //     return `{} times! You Overachiever!`
    // }

    
    render(){

        return(
            <section>
                <p>{this.props.goalState} dynamic message here</p>
                {/* <p>{() => this.props.addWeekly(this.props.month[0])} does this work?</p> */}
    
                {
                    
                }
            </section>
        );

    }

}

export default Message;