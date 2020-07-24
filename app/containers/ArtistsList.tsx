import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateArtist, displayArtist } from '../features/player/playerSlice';
import { db } from '../data/Library';
import Artist from '../components/Artist';

export default function Artists() {
  const current = useSelector(displayArtist);
  const dispatch = useDispatch();
  const artistData = db.get('artists').sortBy('name').value();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const artists = artistData.map((artist: any, index: number) => {
    return (
      <button
        type="button"
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        onClick={() => {
          dispatch(updateArtist(artist.id));
        }}
        className="text-left text-sm text-gray-400 w-full p-2 py-3 transition-all ease-linear duration-150 border-b border-gray-800 hover:bg-gray-900"
      >
        {artist.name}
      </button>
    );
  });
  return (
    <section className="flex  mb-20">
      <div className="w-64 p-3 border-r border-gray-800">{artists}</div>
      <Artist artist={current} />
    </section>
  );
}
