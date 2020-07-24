import React from 'react';
import { useDispatch } from 'react-redux';
import { db } from '../data/Library';
import { addToQueue, updateQueue, clearQueue } from '../data/Queue';
import { updatePlaying, play, pause } from '../features/player/playerSlice';
import Scan from './Scan';

export default function Songs() {
  const dispatch = useDispatch();
  const data = db.get('songs').sortBy('album', `['track']['no']`).value();
  const songs = data.map(
    (
      song: {
        id: number;
        title: string;
        album: string;
        artists: string[];
        track: { no: number };
      },
      index: number
    ) => {
      return (
        <div
          key={song.id}
          className="grid grid-cols-disc text-left text-gray-400 w-full py-3 transition-all ease-linear duration-150 border-b border-gray-800 hover:bg-gray-900"
        >
          <button
            type="button"
            onClick={() => {
              dispatch(pause());
              dispatch(updatePlaying(song));
              dispatch(play());
              clearQueue();
              updateQueue(data, index);
            }}
            className="px-1"
          >
            {song.track.no}
          </button>
          <div className="px-1">{song.title}</div>
          <div className="px-1">{song.album}</div>
          <div className="px-1">{song.artists}</div>
          <button
            type="button"
            onClick={() => {
              addToQueue(song);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#999999"
              className="w-4 text-gray-400"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M14 10H2v2h12v-2zm0-4H2v2h12V6zm4 8v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM2 16h8v-2H2v2z" />
            </svg>
          </button>
        </div>
      );
    }
  );
  return (
    <section className="text-left text-sm p-4 h-full">
      <div className="grid grid-cols-disc">
        <h4 className="max-w-xs">No.</h4>
        <h4 className="px-1">Song</h4>
        <h4 className="px-1">Album</h4>
        <h4 className="px-1">Artist</h4>
      </div>
      <div className="h-full">{data[0] ? songs : <Scan />}</div>
    </section>
  );
}
