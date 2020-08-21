import React from 'react';
import { queue, clearQueue } from '../../data/Queue';

export default function Queue() {
  const data = queue.get('songs').value();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const songs = data.map((song: any, index: number) => {
    return (
      <div
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        className="text-left text-xs text-gray-400 w-full py-3 transition-all ease-linear duration-150 border-b border-gray-800 hover:bg-gray-900"
      >
        <div className="flex items-center">
          {song.picture ? (
            <img
              src={song.picture}
              alt={song.title}
              className="w-12 h-12 rounded-sm mr-2"
            />
          ) : (
            <svg
              className="h-16 w-16 mr-2"
              viewBox="0 0 52 52"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="100%" height="100%" rx="4" fill="#BDBDBD" />
            </svg>
          )}
          <div>
            <div className="px-1">{song.title}</div>
            <div className="px-1">{`${song.artists} - ${song.album}`}</div>
          </div>
        </div>
      </div>
    );
  });
  return (
    <div className="fixed right-0 p-4 w-64 bg-black border-b border-l border-gray-800 h-full overflow-y-auto">
      <div className="flex justify-between items-end">
        <h4 className="text-sm">Queue</h4>
        <button
          type="button"
          className="text-xs text-gray-600 uppercase"
          onClick={() => clearQueue()}
        >
          Clear
        </button>
      </div>
      {songs}
    </div>
  );
}
