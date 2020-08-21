import React from 'react';
import { useSelector } from 'react-redux';
import { displayArtist } from '../../reducers/playerSlice';
import { db } from '../../data/Library';
import ArtistList from './ArtistList';
import Artist from './Artist';

export default function Artistspage() {
  const current = useSelector(displayArtist);
  const data = db.get('artists').sortBy('name').value();

  return (
    <section className="flex  mb-20">
      <ArtistList artists={data} />
      <Artist artist={current} />
    </section>
  );
}
