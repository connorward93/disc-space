import React from 'react';

export default function CurrentlyPlaying(props: {
  currentlyPlaying: { title: string; artist: string; picture: string };
}) {
  // eslint-disable-next-line react/destructuring-assignment
  const { title, artist, picture } = props.currentlyPlaying;
  return (
    <>
      {title && (
        <>
          {picture ? (
            <img src={picture} alt={title} className="h-16 w-16 rounded-sm" />
          ) : (
            <svg
              className="h-16 w-16"
              viewBox="0 0 52 52"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="52" height="52" rx="4" fill="#BDBDBD" />
            </svg>
          )}

          <div className="my-auto ml-2">
            <h6>{title}</h6>
            <p>{artist}</p>
          </div>
        </>
      )}
    </>
  );
}
