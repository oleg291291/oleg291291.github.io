import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { MemoryRouter } from 'react-router'

import Welcome from '../components/Welcome'
import GameSetup from '../components/GameSetup'
import Game from '../components/Game'
import Score from '../components/Score'

const AppRouter = () => (

  <MemoryRouter>

    <div className='page-container'>
      <Switch>
        <Route path="/game-setup" component={GameSetup} exact={true} />
        <Route path="/game" component={Game} exact={true} />
        <Route path="/score" component={Score} exact={true} />
        <Route component={Welcome} />
      </Switch>
    </div>
  </MemoryRouter>
);

export default AppRouter;
