import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar';
import Queue from '../features/player/Queue';
import Player from '../features/player/Player';
import { displayQueue } from '../features/player/PlayerSlice';

type Props = {
  children: ReactNode;
};

export default function Layout(props: Props) {
  const queue = useSelector(displayQueue);
  const { children } = props;
  return (
    <>
      <main className="grid grid-cols-main mb-24">
        <Sidebar />
        <div className="overflow-y-auto max-h-screen">{children}</div>
        {queue && <Queue />}
      </main>
      <footer className="fixed bottom-0">
        <Player />
      </footer>
    </>
  );
}
