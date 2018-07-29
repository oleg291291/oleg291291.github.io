import React from 'react';

import { connect } from 'react-redux';

import { addProfileInfo } from '../actions/profileData';

class GameSetup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerName: '',
            playerLastName: '',
            playerEmail: '',
            gameSkirt: 'skirt1',
            gameDifficulty: '12',
            isEmailValid: false,
            isNameValid: false
        }
        this.inputNameRef = React.createRef()
        this.inputEmailRef = React.createRef()
    }
    onNameChange = (event) => {
        const nameInput = event.target.value;
        this.setState(() => ({ playerName: nameInput }));
        if (nameInput.length > 0) {
            this.setState(() => ({ isNameValid: true }));
            this.inputNameRef.current.style.color = '#000'
        }
        else {
            this.setState(() => ({ isNameValid: false }));
        }
    }
    onLastNameChange = (event) => {
        const lastNameInput = event.target.value;
        this.setState(() => ({ playerLastName: lastNameInput }));
    }
    onEmailChange = (event) => {
        const emailInput = event.target.value;
        this.setState(() => ({ playerEmail: emailInput }));
        if (emailInput.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            this.setState(() => ({ isEmailValid: true }));
            this.inputEmailRef.current.style.color = '#000'
        }
        else {
            this.setState(() => ({ isEmailValid: false }));
        }
    }
    onSkirtClick = (event) => {
        const skirt = event.target.value;
        this.setState(() => ({ gameSkirt: skirt }));
    }
    onDifficultyClick = (event) => {
        const difficulty = event.target.value;
        this.setState(() => ({ gameDifficulty: difficulty }));
    }
    onSubmit = (event) => {

        if (this.state.isNameValid && this.state.isEmailValid) {
            this.props.dispatch(addProfileInfo(this.state));
            this.props.history.push('/game')
        }
        else {
            if (!this.state.isNameValid)
                this.inputNameRef.current.style.color = '#FFDC73'
            if (!this.state.isEmailValid)
                this.inputEmailRef.current.style.color = '#FFDC73'

        }

    }
    render() {
        return (

            <div className="profile-container">
                <form className="profile-form" onSubmit={(event) => event.preventDefault()}>
                    <div className="profile-form-fields">

                        <div className="profile-text-inputs">
                            <label htmlFor="profileName" ref={this.inputNameRef}>Name *
                        <input type="text" id="profileName" className="profile-name-input" placeholder="your name" value={this.state.playerName} onChange={this.onNameChange} />
                            </label>
                            <label htmlFor="profileLastName">Last Name
                        <input type="text" id="profileLastName" placeholder="your last name" value={this.state.playerLastName} onChange={this.onLastNameChange} />
                            </label>
                            <label htmlFor="profile-email" ref={this.inputEmailRef}>Email *
                        <input type="email" id="profileEmail" className="profile-email-input" placeholder="your email" value={this.state.playerEmail} onChange={this.onEmailChange} />
                            </label>
                        </div>

                        <div className="profile-checkboxes">
                            <p>Choose skirt :</p>
                            <div className="profile-skirt-checkboxes">
                                <input type="radio" id="profile-skirt1" name="skirt" value="skirt1" defaultChecked onClick={this.onSkirtClick} />
                                <label htmlFor="profile-skirt1"></label>
                                <input type="radio" id="profile-skirt2" name="skirt" value="skirt2" onClick={this.onSkirtClick} />
                                <label htmlFor="profile-skirt2"></label>
                            </div>
                            <p>Choose field :</p>
                            <div className="profile-difficulty-checkboxes">
                                <input type="radio" id="profileDifficulty1" name="difficulty" value="12" defaultChecked onClick={this.onDifficultyClick} />
                                <label htmlFor="profileDifficulty1">4 x 3</label>
                                <input type="radio" id="profileDifficulty2" name="difficulty" value="18" onClick={this.onDifficultyClick} />
                                <label htmlFor="profileDifficulty2">6 x 3</label>
                            </div>
                        </div>
                    </div>

                    <input type="button" value="START!" onClick={this.onSubmit} />

                </form>
            </div>

        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        ...state.profileData
    };
};

export default connect(mapStateToProps)(GameSetup);