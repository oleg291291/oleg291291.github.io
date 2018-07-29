import React from 'react';

import { Route, Redirect } from 'react-router'
import { connect } from 'react-redux';

import { solvedCardsInc, solvedCardsReset, openedCardsAdd, openedCardsReset } from '../actions/gameData'


class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameSolved: false,
        }
        this.myRef = React.createRef()
    }

    openCard = (event) => {
        const isItProperCard = !event.target.parentNode.classList.contains('fade') && !event.target.parentNode.classList.contains('rotated') ? true : false
        if (this.props.openedCards.length < 2 && isItProperCard) {
            
            this.myRef.current.classList.add('rotated')
            this.props.dispatch(openedCardsAdd(this.props.cardValue, this.myRef))

            this.compareCards();
        }
    }
    compareCards = () => {
        if (this.props.openedCards.length > 0) {

            setTimeout(() => {
                if (this.props.openedCards[0] == this.props.cardValue) {

                    this.props.openedCardsRefs[0].current.classList.add('fade')
                    this.myRef.current.classList.add('fade')

                    this.props.dispatch(openedCardsReset())
                    this.props.dispatch(solvedCardsInc())

                    if (this.props.cardsSolved >= this.props.gameDifficulty) {

                        setTimeout(() => {
                            this.props.dispatch(solvedCardsReset())
                            this.setState(() => ({
                                gameSolved: true
                            }))
                        }, 2000)
                    }
                }
                else {
                    this.props.openedCardsRefs[0].current.classList.remove('rotated')
                    this.myRef.current.classList.remove('rotated')
                    this.props.dispatch(openedCardsReset())

                }
            }, 2000)

        }

    }
    
    render() {
        if (this.state.gameSolved == true) {
            return (<Redirect to='/score' />)
        }
        return (
            <div className="card" onClick={this.openCard} key={this.props.key} ref={this.myRef}>
                <div className={"front side " + this.props.cardSkirt}></div>
                <div className={"back side card-value-" + this.props.cardValue}>
                    <p>{this.props.cardValue}</p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        ...state.profileData[0],
        ...state.gameData[0]
    };
};

export default connect(mapStateToProps)(Card);