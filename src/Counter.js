import React, {Component} from 'react';

class Counter extends Component {

    render(){
        return(
            <select
                name="times"
                onChange={(event) => this.props.trackerFunction(event, this.props.weekIndex, this.props.dayIndex)}
            >
                <option selected={this.props.value === 0 ? "selected" : "false"} value="0">0</option>
                <option selected={this.props.value === 1 ? "selected" : "false"} value="1">1</option>
                <option selected={this.props.value === 2 ? "selected" : "false"} value="2">2</option>
                <option selected={this.props.value === 3 ? "selected" : "false"} value="3">3</option>

            </select> 
        );
    }

}
export default Counter;