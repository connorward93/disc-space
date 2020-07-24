/* eslint-disable no-console */
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const { db } = require('./Library');

// Queue
const queueAdapter = new FileSync('queue.json');
export const queue = low(queueAdapter);

queue.defaults({ songs: [] }).write();

const shuffle = (songs: any[]) => {
  songs.forEach(() => {
    const randomIndex = Math.floor(<number>Math.random() * songs.length);
    const song = songs.splice(randomIndex, 1)[0];
    queue.get('songs').push(song).write();
  });
};

export const shuffleAll = () => {
  const songs = db.get('songs').value();
  shuffle(songs);
};

export const getNextSong = () => {
  const arr = queue.get('songs').value();
  let song = arr.shift();
  if (!song) {
    shuffleAll();
    song = getNextSong();
  }
  queue.set('songs', arr).write();
  return song;
};

export const addToQueue = (data: any) => {
  queue.get('songs').push(data).write();
};

export const updateQueue = (songs: any, index: number) => {
  const newQueue = songs.slice(index);
  queue.set('songs', newQueue).write();
};

export const clearQueue = () => {
  queue.set('songs', []).write();
};

export const getAlbum = (album: any) =>
  db
    .get('songs')
    .filter((song: any) => song.album === album.title)
    .value();

// History
const historyAdapter = new FileSync('history.json');
export const history = low(historyAdapter);

history.defaults({ songs: [] }).write();

export const getPrevSong = () => {
  const arr = history.get('songs').value();
  const song = arr.pop();
  history.set('songs', arr).write();

  // Update queue
  const newQueue = [song, ...queue.get('songs').value()];
  queue.set('songs', newQueue).write();

  return song;
};

export const addToHistory = (data: any) => {
  history.get('songs').push(data).write();
};

export const clearHistory = () => {
  history.set('songs', []).write();
};
