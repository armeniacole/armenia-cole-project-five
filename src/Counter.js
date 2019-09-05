import React, {Component} from 'react';

class Counter extends Component {

    render(){
        return(
            <select
                name="times"
                onChange={(event) => this.props.trackerFunction(event, this.props.weekIndex, this.props.dayIndex)}
            >
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>

            </select> 
        );
    }

}
export default Counter;