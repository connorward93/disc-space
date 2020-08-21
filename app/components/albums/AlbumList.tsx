import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { db } from '../../data/Library';
import { updatePlaying, play, pause } from '../../reducers/playerSlice';
import { getAlbum, clearQueue, updateQueue } from '../../data/Queue';

export default function AlbumList() {
  const dispatch = useDispatch();
  const albumData = db.get('albums').sortBy('artist', 'album').value();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const albums = albumData.map((album: any, index: number) => {
    return (
      // eslint-disable-next-line react/no-array-index-key
      <div key={index}>
        <div className="relative">
          {album.artwork ? (
            <img
              alt={album.title}
              src={album.artwork}
              className="rounded mb-1 h-full w-full"
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
          <button
            type="button"
            onClick={() => {
              dispatch(pause());
              dispatch(updatePlaying(getAlbum(album)[0]));
              dispatch(play());
              clearQueue();
              updateQueue(getAlbum(album), 0);
            }}
            className="bg-opacity-0 opacity-0 bg-black hover:bg-opacity-50 hover:opacity-100 transition ease-linear duration-200 cursor-pointer w-full h-full absolute top-0 flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="w-16 h-16"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>
        <Link to={`/albums/${album.id}`}>
          <h4>{album.artist}</h4>
          <span className="text-gray-400">{album.title}</span>
        </Link>
      </div>
    );
  });
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6 text-sm mb-24 p-4">
      {albums}
    </div>
  );
}
