'use strict';

const apiKey = 'API_KEY';

let playlistId = '';
let videoIds = [];
let totalSeconds = 0;
const calcBtn = document.querySelector('.js-calculate-button');
const input = document.querySelector('.js-input');
const result = document.querySelector('.js-result');

const getPlaylistId = function (link) {
  const urlParams = new URL(link);
  return urlParams.searchParams.get('list');
};

calcBtn.addEventListener('click', function () {
  const link = input.value;

  if (link.length > 34) {
    playlistId = getPlaylistId(link);
  } else if (link.length === 34) {
    playlistId = link;
  } else {
    alert('Please enter a vaild playlist link or ID');
    return;
  }

  getPlaylistItem(playlistId);
});

const getPlaylistItem = async function (playlistId, pageToken = null) {
  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&playlistId=${playlistId}&maxResults=50&key=${apiKey}&pageToken=${
        pageToken || ''
      }`
    );
    const data = await res.json();

    if (data.error) {
      if (data.error.code === 403)
        throw new Error(
          'This channel is closed/suspended or the playlist is forbidden'
        );

      if (data.error.code === 404)
        throw new Error('Playlist ID is not right, please check link again');

      if (data.error.code === 400)
        throw new Error(
          `The site does not support the ability to list the specified playlist. For example, you can not caculate your watch later playlist's time.`
        );
    }

    data.items.forEach(item => videoIds.push(item.contentDetails.videoId));

    if (data.nextPageToken) {
      await getPlaylistItem(playlistId, data.nextPageToken);
    } else {
      getVideoDuration(videoIds);
    }
  } catch (err) {
    alert(err.message);
  }
};

const getVideoDuration = async function (idsArr) {
  try {
    const requests = idsArr.map(async id => {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${id}&key=${apiKey}`
      );
      return await res.json();
    });

    const data = await Promise.all(requests);

    data.forEach(video => {
      if (video.items.length > 0) {
        const ISOformat = video.items[0].contentDetails.duration;
        timeISOtoSeconds(ISOformat);
      }
    });

    secondsToTime(totalSeconds);
  } catch (err) {
    alert('Problem with getting one or more video of the playlist');
  }
};

const timeISOtoSeconds = function (ISOformat) {
  let inSeconds = 0;
  const t = ISOformat.replace('PT', '')
    .replace('H', ':')
    .replace('M', ':')
    .replace('S', '');

  const parts = t.split(':').map(value => +value);

  if (parts.length === 3)
    inSeconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
  if (parts.length === 2) inSeconds = parts[0] * 60 + parts[1];
  if (parts.length === 1) inSeconds = parts[0];

  totalSeconds += inSeconds;
};

const secondsToTime = function (sec) {
  const hours = String(Math.trunc(sec / 3600)).padStart(2, 0);
  const minutes = String(Math.trunc((sec % 3600) / 60)).padStart(2, 0);
  const seconds = String(sec % 60).padStart(2, 0);

  result.textContent = `${hours}:${minutes}:${seconds}`;

  input.value = '';
  totalSeconds = 0;
  videoIds = [];
  playlistId = '';
};
