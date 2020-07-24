/* eslint-disable no-console */
import electron from 'electron';
import fs from 'fs';
// import * as mm from 'music-metadata';
// import low from 'lowdb';
// import FileSync from 'lowdb/adapters/FileSync';

// Using commonJS because I cba to rewrite Typescript errors when using es imports
const mm = require('music-metadata');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

// Set up 'database'
const adapter = new FileSync('db.json');
export const db = low(adapter);
db.defaults({ songs: [], artists: [], albums: [], config: {} }).write();

// Parse meta data of audio file
const parseMetaData = (file: string) => {
  return mm
    .parseFile(file)
    .then(
      (metadata: {
        common: { duration: number };
        format: { duration: number };
      }) => {
        const data = metadata.common;
        data.duration = metadata.format.duration;
        return data;
      }
    );
};

// Add artists to database
let artistId = 0;
const readArtist = (file: { albumartist: string; artist: string[] }) => {
  const artist = file.albumartist || file.artist;
  const checkArtist = db.get('artists').find({ name: artist }).value();

  if (!checkArtist) {
    artistId += 1;
    db.get('artists').push({ name: artist, id: artistId }).write();
    return artistId;
  }
  return checkArtist.id;
};

// Generate image file for album art
const generateArtwork = (
  file: { filePath: string; fileName: string; album: string },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pictureData: Array<{ format: string; data: any }>
) => {
  // Generate image using binary data from metadata
  const img = `data:${
    pictureData[0].format
  };base64,${pictureData[0].data.toString('base64')}`;
  const data = img.replace(/^data:image\/\w+;base64,/, '');
  const buf = Buffer.from(data, 'base64');

  // Save image file
  const format = pictureData[0].format.split('/')[1];
  const path = file.filePath.split(file.fileName);
  const coverPath = `${path[0]}/${file.album}-cover.${format}`;
  fs.writeFile(coverPath, buf, () => {
    return true;
  });
  // If image created successfully, return file path
  if (fs.existsSync(coverPath)) {
    return coverPath;
  }
  // If image not created, return default
  return `${__dirname}/assets/default.png`;
};

// Add albums to database
let albumId = 0;
const readAlbum = (
  file: {
    albumartist: string;
    artist: string[];
    album: string;
    filePath: string;
    fileName: string;
    year: string;
  },
  pictureData: Array<{ format: string; data: number }>
) => {
  const artist = file.albumartist || file.artist;
  const checkAlbum = db.get('albums').find({ title: file.album }).value();
  if (!checkAlbum) {
    const artwork = generateArtwork(file, pictureData);
    albumId += 1;
    db.get('albums')
      .push({
        artist,
        artistId,
        title: file.album,
        artwork,
        id: albumId,
        year: file.year,
      })
      .write();
    return albumId;
  }
  return checkAlbum.id;
};

const findArtwork = async (file: { album: { artwork: string } }) => {
  const album = await db.get('albums').find({ title: file.album }).value();
  return album.artwork;
};

const checkFile = (filePath: string) => {
  if (db.get('songs').filter({ filePath }).value()[0]) {
    return false;
  }
  return true;
};

// Process files during file scan
let trackId = 0;
const readFiles = (folderPath: string) => {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error(err.message);
    }
    try {
      files.forEach(async (file: string) => {
        const filePath = `${folderPath}/${file}`;
        if (fs.statSync(filePath).isDirectory()) {
          // Restart process if passed a folder instead of file
          readFiles(filePath);
          // If passed valid audio file, parse metadata
        } else if (
          /^.*\.mp3|wav|flac|aac$/.test(filePath) &&
          checkFile(filePath)
        ) {
          const data = await parseMetaData(filePath);

          data.fileName = file;
          data.filePath = filePath;

          const pictureData = data.picture;
          data.artistId = readArtist(data);
          data.albumId = readAlbum(data, pictureData);
          data.picture = await findArtwork(data);

          trackId += 1;
          data.id = trackId;

          db.get('songs').push(data).write();
        }
      });
    } catch (error) {
      console.error(error.message);
    }
  });
};

// Start file scan
export const selectFolder = async () => {
  const { dialog } = electron.remote;
  const folder = await dialog.showOpenDialog({
    properties: ['openDirectory'],
  });
  const folderPath = folder.filePaths[0];
  db.set('config.folderPath', folderPath).write();
  db.set('songs', []).write();
  db.set('artists', []).write();
  db.set('albums', []).write();
  readFiles(folderPath);
};
