import React from 'react';
import { useDispatch } from 'react-redux';
import { updateArtist } from '../../reducers/playerSlice';

type Artist = {
  name: string;
  id: number;
};

export default function ArtistList(props: { artists: Array<Artist> }) {
  const dispatch = useDispatch();
  const { artists } = props;
  return (
    <div className="w-64 p-3 border-r border-gray-800">
      {artists.map((artist, index: number) => {
        return (
          <button
            type="button"
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            onClick={() => {
              dispatch(updateArtist(artist.id));
            }}
            className="text-left text-sm text-gray-400 w-full p-2 py-3 transition-all ease-linear duration-150 border-b border-gray-800 hover:bg-gray-900"
          >
            {artist.name}
          </button>
        );
      })}
    </div>
  );
}
