import React from 'react';
import { NavLink } from 'react-router-dom';

const Welcome = () => (
    <div className="welcome-container">
            <div className="welcome">
                <h1>Hi! It's Matching Game!</h1>
                <p className="welcome__rules">The memory game is a basic matching game to test the player's memory. In a deck of paired cards, the player
                    needs to match each pair fast as they can to win the game.</p>
                <NavLink to="game-setup" activeClassName="is-active" exact={true}><input type="button" className="welcome__button" value="OK" /></NavLink>
            </div>
        </div>
);

export default Welcome;