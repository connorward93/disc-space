import React from 'react';
import { useSelector } from 'react-redux';
import { currentlyPlaying } from '../../reducers/playerSlice';
import Audio from './Audio';
import Playing from './CurrentlyPlaying';
import PrimaryControls from './PrimaryControls';
import SecondaryControls from './SecondaryControls';

export default function Player() {
  const current = useSelector(currentlyPlaying);

  return (
    <div className="fixed bottom-0 w-full grid grid-cols-3 bg-black px-4 py-3 text-xs border-gray-800 border-t h-24">
      <div className="flex">
        {current.title && <Playing currentlyPlaying={current} />}
      </div>
      <div className="my-auto">
        <PrimaryControls />
        <Audio />
      </div>
      <div className="flex items-center justify-end px-2">
        <SecondaryControls />
      </div>
    </div>
  );
}
