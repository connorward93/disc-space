import React from 'react';
import { useDispatch } from 'react-redux';
// import { clearHistory } from '../../data/Queue';
import { toggleQueue } from '../../reducers/playerSlice';
import { selectFolder } from '../../data/Library';

export default function SecondaryControls() {
  const dispatch = useDispatch();
  return (
    <>
      <button type="button" onClick={() => dispatch(toggleQueue())}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          className="px-1 w-6 h-6"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M4 10h12v2H4zm0-4h12v2H4zm0 8h8v2H4zm10 0v6l5-3z" />
        </svg>
      </button>
      <button type="button" onClick={() => selectFolder()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          className="px-1 w-5 h-5"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12zm-7-2h2v-3h3V9h-3V6h-2v3h-3v2h3z" />
        </svg>
      </button>
    </>
  );
}
