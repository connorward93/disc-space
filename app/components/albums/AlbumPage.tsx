import React from 'react';
import { useParams } from 'react-router';
import AlbumItem from './AlbumItem';

export default function Album() {
  // Route - /albums/:id
  let { id } = useParams();
  // eslint-disable-next-line radix
  id = parseInt(id);

  return <AlbumItem id={id} />;
}
