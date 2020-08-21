import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  play,
  pause,
  playState,
  currentlyPlaying,
  updatePlaying,
} from '../../reducers/playerSlice';

import { getNextSong, getPrevSong, addToHistory } from '../../data/Queue';

export default function PrimaryControls() {
  const dispatch = useDispatch();
  const current = useSelector(currentlyPlaying);
  const state = useSelector(playState);
  return (
    <div className="flex justify-center" style={{ marginBottom: '2px' }}>
      <button
        type="button"
        id="back"
        onClick={() => {
          const song = getPrevSong();
          if (song) {
            dispatch(updatePlaying(song));
          }
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 5H6.66667V15H5V5ZM7.91667 10L15 15V5L7.91667 10Z"
            fill="white"
          />
        </svg>
      </button>
      {state === true ? (
        <button
          type="button"
          id="play"
          className="mx-2"
          onClick={() => {
            dispatch(play());
          }}
        >
          <svg
            width="2.25rem"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
          </svg>
        </button>
      ) : (
        <button
          type="button"
          id="pause"
          className="mx-2"
          onClick={() => {
            dispatch(pause());
          }}
        >
          <svg
            width="2.25rem"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
          </svg>
        </button>
      )}

      <button
        type="button"
        id="forward"
        onClick={() => {
          const song = getNextSong();
          if (song) {
            dispatch(updatePlaying(song));
            addToHistory(current);
          }
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 15L12.0833 10L5 5V15ZM13.3333 5V15H15V5H13.3333Z"
            fill="white"
          />
        </svg>
      </button>
    </div>
  );
}
