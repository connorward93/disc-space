import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  play,
  pause,
  playState,
  currentlyPlaying,
  updatePlaying,
} from './playerSlice';

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
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.7332 2.40005C8.37324 2.40005 2.3999 8.37339 2.3999 15.7334C2.3999 23.0934 8.37324 29.0667 15.7332 29.0667C23.0932 29.0667 29.0666 23.0934 29.0666 15.7334C29.0666 8.37339 23.0932 2.40005 15.7332 2.40005ZM13.0666 21.7334V9.73339L21.0666 15.7334L13.0666 21.7334Z"
              fill="white"
            />
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
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.335 3C8.97408 3 3 8.97408 3 16.335C3 23.6959 8.97408 29.67 16.335 29.67C23.6959 29.67 29.67 23.6959 29.67 16.335C29.67 8.97408 23.6959 3 16.335 3ZM15.0015 21.669H12.3345V11.001H15.0015V21.669ZM20.3355 21.669H17.6685V11.001H20.3355V21.669Z"
              fill="white"
            />
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
