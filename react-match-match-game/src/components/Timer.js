import React from 'react';
import { connect } from 'react-redux';

import { timerInc, setTime } from '../actions/gameData'

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: 0
        }
    }
    componentDidMount() {
        this.timer = setInterval(() => {
            this.setState((state) => {
                return {
                    ...state,
                    timer: ++state.timer
                }
            })
            this.props.dispatch(setTime(this.state.timer))
        }, 1000)
    }
    componentWillUnmount() {
        clearInterval(this.timer)
    }
    render() {
        return (<div className="timer-container">
            <div className="timer">
                <div className="timer__header">Timer: </div>
                <div className="timer__value">{this.state.timer}</div>
                <div className="timer__description"> seconds.</div>
            </div>
        </div>)
    }
}

const mapStateToProps = (state, props) => {
    return {
        ...state.gameData
    };
};

export default connect(mapStateToProps)(Timer);