import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="border-r border-gray-800 min-h-screen text-sm p-4 sticky top-0">
      <div className="">
        <h4 className="">Music</h4>
        <ul className="text-gray-400">
          <li className="my-1">
            <Link to="/songs">Songs</Link>
          </li>
          <li className="my-1">
            <Link to="/artists">Artists</Link>
          </li>
          <li className="my-1">
            <Link to="/albums">Albums</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
