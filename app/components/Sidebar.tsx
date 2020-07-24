import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';

export default function Sidebar() {
  return (
    <div className="border-r border-gray-800 min-h-screen text-sm p-4 sticky top-0">
      <div className="">
        <h4 className="">Music</h4>
        <ul className="text-gray-400">
          <li className="my-1">
            <Link to={routes.HOME}>Songs</Link>
          </li>
          <li className="my-1">
            <Link to={routes.ARTISTS}>Artists</Link>
          </li>
          <li className="my-1">
            <Link to={routes.ALBUMS}>Albums</Link>
          </li>
        </ul>
      </div>
      {/* <div className="mt-8">
        <h4 className="">Playlists</h4>
        <ul className="text-gray-400">
          <li className="my-1">Summer Mix 2020</li>
        </ul>
      </div> */}
    </div>
  );
}
