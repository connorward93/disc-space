import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../store';

const playerSlice = createSlice({
  name: 'player',
  initialState: {
    playing: { title: '', artist: '', filePath: '', duration: 0, picture: '' },
    paused: true,
    progress: '0',
    displayQueue: false,
    queue: {},
    artist: 1,
  },
  reducers: {
    updatePlaying: (state, action) => {
      state.playing = action.payload;
    },
    updateProgress: (state, action) => {
      state.progress = action.payload;
    },
    play: (state) => {
      state.paused = false;
    },
    pause: (state) => {
      state.paused = true;
    },
    toggleQueue: (state) => {
      state.displayQueue = !state.displayQueue;
    },
    updateArtist: (state, action) => {
      state.artist = action.payload;
    },
  },
});

export const {
  updatePlaying,
  updateProgress,
  play,
  pause,
  toggleQueue,
  updateArtist,
} = playerSlice.actions;

export default playerSlice.reducer;

export const currentlyPlaying = (state: RootState) => state.player.playing;
export const playState = (state: RootState) => state.player.paused;
export const songProgress = (state: RootState) => state.player.progress;
export const displayQueue = (state: RootState) => state.player.displayQueue;
export const displayArtist = (state: RootState) => state.player.artist;
