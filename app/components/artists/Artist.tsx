import React from 'react';
import { db } from '../../data/Library';
import AlbumItem from '../albums/AlbumItem';

export default function Artist(props: { artist: number }) {
  const albums = db
    .get('albums')
    .filter(
      (album: { id: number; artistId: number }) =>
        album.artistId === props.artist
    )
    .value();

  return (
    <div className="w-full">
      {albums.map((album: { id: number }) => {
        return <AlbumItem key={album.id} id={album.id} />;
      })}
    </div>
  );
}
