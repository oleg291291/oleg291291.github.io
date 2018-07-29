import React from 'react';
import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux';

import uuid from 'uuid';

class Score extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            score: [],
            playerScore: props.gameData[0].time,
            scoreFetched: false
        }
    }
    componentDidMount() {

        fetch('https://mmg-score.herokuapp.com/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.props.profileData[0].playerName + ' ' + this.props.profileData[0].playerLastName,
                email: this.props.profileData[0].playerEmail,
                score: this.props.gameData[0].time
            }),
        }).then((response) => {
            return response.json();
        }).then((data) => {

            fetch('https://mmg-score.herokuapp.com/', {
                method: 'GET'
            }).then((response) => {
                return response.json();
            }).then((data) => {

                const scoreList = data.result;
                scoreList.sort(function (a, b) {
                    if (a.score > b.score) {
                        return 1;
                    }
                    if (a.score < b.score) {
                        return -1;
                    }
                    return 0;
                });
                if (scoreList.length > 10) {
                    scoreList.length = 10;
                };

                this.setState(() => ({ score: scoreList, playerScore: this.props.gameData[0].time, scoreFetched: true }));
            });
        })
    }

    render() {
        return (this.state.scoreFetched && <div className="score" >
            <p className="score__current-time">Your time is <span>{this.state.playerScore}</span> seconds !
            </p>
            <h3>Top results</h3>
            <ul className="score__high-score">
                {this.state.score.map((item) => { return (<li key={uuid()}>{item.username + ' / ' + item.email + ' / ' + item.score + ' sec.'}</li>) })}

            </ul>
            <NavLink to="/" activeClassName="is-active" exact={true}>
                <input className="score__restart" type="button" value="Restart!" />
            </NavLink>
        </div >)
    }

}

const mapStateToProps = (state, props) => {
    return {
        ...state
    };
};

export default connect(mapStateToProps)(Score);