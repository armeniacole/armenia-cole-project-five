import React from 'react';

const Message = (props) =>  {
    // need some way to track which week they are using
    // maybe messages should include a week 1,2,3,4 label?


    // if (weeklyTimes < goal) {
    //     return `{} times till you meet this weeks goal`
    // } elseif (weeklyTimes === goal) {
    //     return `{} times! You met your goal this week!`
    // } elseif (weeklyTimes > goal) {
    //     return `{} times! You Overachiever!`
    // }
    return(
        <section>
            <p>{}dynamic message here</p>
        </section>
    );

}

export default Message;