import React from 'react';
import { db } from '../data/Library';
import AlbumItem from './AlbumItem';

export default function Artist(props: { artist: any }) {
  const albums = db
    .get('albums')
    .filter(
      (album: { id: number; artistId: number }) =>
        album.artistId === props.artist
    )
    .value();
  const components = albums.map((album: { id: number }) => {
    return <AlbumItem key={album.id} id={album.id} />;
  });
  return <div className="w-full">{components}</div>;
}
