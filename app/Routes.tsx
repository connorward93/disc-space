import React from 'react';
import { Switch, Route } from 'react-router-dom';
import App from './containers/App';
import SongsPage from './components/songs/SongsPage';
import Artists from './components/artists/ArtistsPage';
import AlbumList from './components/albums/AlbumList';
import Album from './components/albums/AlbumPage';

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route path="/albums/:id" component={Album} />
        <Route path="/albums" component={AlbumList} />
        <Route path="/artists" component={Artists} />
        <Route path="/" component={SongsPage} />
      </Switch>
    </App>
  );
}
