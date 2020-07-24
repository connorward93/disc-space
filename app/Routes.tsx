import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
import HomePage from './containers/HomePage';
import Artists from './containers/ArtistsList';
import AlbumList from './containers/AlbumList';
import Album from './containers/AlbumPage';

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route path="/albums/:id" component={Album} />
        <Route path={routes.ALBUMS} component={AlbumList} />
        <Route path={routes.ARTISTS} component={Artists} />
        <Route path={routes.HOME} component={HomePage} />
      </Switch>
    </App>
  );
}
