import React, { useRef, MutableRefObject } from 'react';
import { useSelector } from 'react-redux';
import { currentlyPlaying, songProgress } from '../../reducers/playerSlice';

export default function ProgressBar() {
  const currentTrack = useSelector(currentlyPlaying);
  const currentProgress = useSelector(songProgress);
  const progress = useRef() as MutableRefObject<HTMLProgressElement>;
  const displayDuration = new Date(currentTrack.duration * 1000)
    .toISOString()
    .substr(14, 5);

  const currentDuration = new Date(
    currentTrack.duration * currentProgress * 1000
  )
    .toISOString()
    .substr(14, 5);

  return (
    <>
      <span>{currentDuration}</span>
      <progress
        value={currentProgress}
        ref={progress}
        className="w-full h-auto m-auto mx-2"
      />
      <span>{displayDuration}</span>
    </>
  );
}
