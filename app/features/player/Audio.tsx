/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useEffect, MutableRefObject } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateProgress,
  updatePlaying,
  currentlyPlaying,
  playState,
} from './playerSlice';
import Progress from './Progress';
import { getNextSong, addToHistory } from '../../data/Queue';

export default function Audio() {
  const currentTrack = useSelector(currentlyPlaying);
  const state = useSelector(playState);
  const audio = useRef() as MutableRefObject<HTMLAudioElement>;
  const dispatch = useDispatch();

  useEffect(() => {
    if (state === false) {
      audio.current.play();
    } else {
      audio.current.pause();
    }
  });

  const updateProgressState = (
    e: React.SyntheticEvent<HTMLAudioElement, Event>
  ) => {
    const val = e.target.currentTime / currentTrack.duration;
    dispatch(updateProgress(val));

    if (currentTrack.duration - e.target.currentTime < 1) {
      addToHistory(currentTrack);
      const song = getNextSong();
      dispatch(updatePlaying(song));
    }
  };

  return (
    <div className="flex items-center text-xs">
      <audio
        src={currentTrack.filePath}
        ref={audio}
        onTimeUpdate={(e) => {
          updateProgressState(e);
          e.persist();
        }}
      />
      <Progress />
    </div>
  );
}
