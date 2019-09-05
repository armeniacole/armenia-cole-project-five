import React, {Component} from 'react';
import Counter from './Counter';

class Tracker extends Component {
    render(){

        return(
            <section className="tracker">
                <p>Monday</p>
                <p>Tuesday</p>
                <p>Wednesday</p>
                <p>Thursday</p>
                <p>Friday</p>
                <p>Saturday</p>
                <p>Sunday</p>
                <Counter name="monOne" onChange={this.props.monOneState}/>
                <Counter />
                <Counter />
                <Counter />
                <Counter />
                <Counter />
                <Counter />
                <Counter />
                <Counter />
                <Counter />
                <Counter />
                <Counter />
                <Counter />
                <Counter />
                <Counter />
                <Counter />
                <Counter />
                <Counter />
                <Counter />
                <Counter />
                <Counter />
                <Counter />
                <Counter />
                <Counter />
                <Counter />
                <Counter />
                <Counter />
                <Counter />
            </section>
        );

    }
}

export default Tracker;