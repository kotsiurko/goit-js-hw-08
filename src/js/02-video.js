import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Player('vimeo-player');
const LS_TIME_KEY = 'videoplayer-current-time';
const throttle = require('lodash.throttle');

const lsWriting = function (data) {
  localStorage.setItem(LS_TIME_KEY, data.seconds);
  // console.log('Writting to local storage', data.seconds);
};

const lsReading = function () {
  let currTime = Number(localStorage.getItem(LS_TIME_KEY));
  // console.log('Reading to local storage', currTime);
  return currTime;
};

player.on('timeupdate', throttle(lsWriting, 1000));
player.setCurrentTime(lsReading());
