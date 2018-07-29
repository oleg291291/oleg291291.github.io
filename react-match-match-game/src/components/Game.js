import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import uuid from 'uuid';

import Card from './Card'
import Timer from './Timer'

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = { cardsNumber: props.gameDifficulty,
                        cardSkirt: props.gameSkirt }
    }

    deckArray = ['red-apple', 'red-apple', 'lemon', 'lemon', 'plum', 'plum', 'banana', 'banana', 'strawberry', 'strawberry', 'pear', 'pear', 'orange', 'orange', 'green-apple', 'green-apple', 'cherry', 'cherry'];

    shuffleDeck = (deckArray) => {
        deckArray.length = this.state.cardsNumber;
        var currentIndex = deckArray.length, temporaryValue, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = deckArray[currentIndex];
            deckArray[currentIndex] = deckArray[randomIndex];
            deckArray[randomIndex] = temporaryValue;
        }
        return deckArray;

    }

    shuffledDeck = () => {return this.shuffleDeck(this.deckArray)};

    render() {
        return (
            <div className="cards-field">
                <Timer />
                {this.shuffledDeck().map((value) => { return <Card key={uuid()} cardValue={value} cardSkirt={this.state.cardSkirt} /> })}
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        ...state.profileData[0]
    };
};

export default connect(mapStateToProps)(Game);