import React from 'react';
import { db } from '../../data/Library';

import SongsTable from './SongsTable';

export default function SongsPage() {
  const data = db.get('songs').sortBy('album', `['track']['no']`).value();

  return <SongsTable songs={data} />;
}
