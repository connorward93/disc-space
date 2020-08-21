import React from 'react';
import { useDispatch } from 'react-redux';
import { addToQueue, updateQueue, clearQueue } from '../../data/Queue';
import { updatePlaying, play, pause } from '../../reducers/playerSlice';
import { db } from '../../data/Library';

export default function AlbumItem(props: { id: number }) {
  const dispatch = useDispatch();

  const data = db
    .get('songs')
    .filter(
      (song: {
        title: string;
        album: string;
        artists: string[];
        id: number;
        albumId: number;
        track: { no: number };
      }) => song.albumId === props.id
    )
    .sortBy(`['track']['no']`)
    .value();

  const albumData = db
    .get('albums')
    // eslint-disable-next-line react/destructuring-assignment
    .find({ id: props.id })
    .value();

  const tracklist = data.map(
    (song: {
      title: string;
      album: string;
      artists: string[];
      id: number;
      track: { no: number };
    }) => {
      const { title, album, artists, id, track } = song;
      return (
        <div key={id} className="last:sticky last:top-0">
          <div className="grid grid-cols-disc text-left text-sm text-gray-400 w-full py-3 transition-all ease-linear duration-150 border-b border-gray-800 hover:bg-gray-900">
            <button
              type="button"
              onClick={() => {
                dispatch(pause());
                dispatch(updatePlaying(song));
                dispatch(play());
                clearQueue();
                updateQueue(data, data.index);
              }}
              className="px-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="w-4 h-4"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
            <div className="px-1">{track.no}</div>
            <div className="px-1">{title}</div>
            <div className="px-1">{album}</div>
            <div className="px-1">{artists}</div>
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
        </div>
      );
    }
  );

  return (
    <div className="p-4 w-full">
      <div className="flex items-center">
        {albumData.artwork ? (
          <img
            alt={albumData.title}
            src={albumData.artwork}
            className="rounded mb-1 h-48 w-48"
          />
        ) : (
          <svg
            viewBox="0 0 52 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="rounded mb-1"
          >
            <rect className="h-full w-full" fill="#BDBDBD" />
          </svg>
        )}
        <div className="ml-4 text-sm">
          <h4 className="font-medium">{albumData.title}</h4>
          <h5 className="text-gray-400 mt-1">{albumData.artist}</h5>
          <h5 className="text-gray-400 mt-1">{albumData.year}</h5>
        </div>
      </div>
      <div className="mt-4 text-sm text-left">
        <div className="grid grid-cols-disc">
          <h4> </h4>
          <h4 className="max-w-xs">No.</h4>
          <h4 className="px-1">Song</h4>
          <h4 className="px-1">Album</h4>
          <h4 className="px-1">Artist</h4>
        </div>
        {tracklist}
      </div>
    </div>
  );
}
