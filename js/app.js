const myPlaylist = [
  {
    cover: "img/cover1.jpg",
    song: "Zing!",
    artist: "Vince Giordano and The Nighthawks",
    audio: "audio/Zing! - Vince Giordano and The Nighthawks.mp3",
  },
  {
    cover: "img/cover2.jpg",
    song: "Upswinging",
    artist: "Simonec",
    audio: "audio/Upswingin - Simonec.mp3",
  },
  {
    cover: "img/cover3.jpg",
    song: "Hello Bright Sunflower",
    artist: "Donald Byrd",
    audio: "audio/Hello Bright Sunflower - Donald Byrd.mp3",
  },
  {
    cover: "img/cover4.jpg",
    song: "Undecided",
    artist: "Errol Garner",
    audio: "audio/Undecided - Errol Garner.mp3",
  },
  {
    cover: "img/cover5.jpg",
    song: "Take Five",
    artist: "The Dave Brubeck Quartet",
    audio: "audio/Take Five - The Dave Brubeck Quartet.mp3",
  },
  {
    cover: "img/cover6.jpg",
    song: "Walkin' Shoes",
    artist: "Gerry Mulligan",
    audio: "audio/Walkin' Shoes - Gerry Mulligan.mp3",
  },
];

const cover = document.querySelector(".cover");
const song = document.querySelector("h2");
const artist = document.querySelector(".artist");
const audio = document.querySelector("audio");

const loopButton = document.getElementById("loop-button");
const resetLoopButton = document.getElementById("reset-loop-button");
const previousButton = document.getElementById("previous-button");
const playButton = document.getElementById("play-button");
const pauseButton = document.getElementById("pause-button");
const nextButton = document.getElementById("next-button");
const queuePlaylistButton = document.getElementById("queue-playlist-button");
const closePlaylistButton = document.getElementById("close-playlist-button");

const progressBarContainer = document.getElementById("progress-bar-container");
const progressBar = document.getElementById("progress-bar");

const currentTime = document.querySelector(".current-time");
const totalTime = document.querySelector(".total-time");

const playlistContainer = document.querySelector(".playlist-container");
const playlist = document.querySelector("ul");

let position = 0;

window.addEventListener("load", () => {
  markPlaylistItem();
});

loopButton.addEventListener("click", () => {
  audio.loop = true;
  loopButton.style.display = "none";
  resetLoopButton.style.display = "flex";
});

resetLoopButton.addEventListener("click", () => {
  audio.loop = false;
  resetLoopButton.style.display = "none";
  loopButton.style.display = "flex";
});

previousButton.addEventListener("click", () => {
  position--;
  chooseSong();
  changeState();
});

playButton.addEventListener("click", () => {
  audio.play();
  playButton.style.display = "none";
  pauseButton.style.display = "flex";
  audio.setAttribute("autoplay", true);
});

pauseButton.addEventListener("click", () => {
  audio.pause();
  pauseButton.style.display = "none";
  playButton.style.display = "flex";
});

nextButton.addEventListener("click", () => {
  position++;
  chooseSong();
  changeState();
});

queuePlaylistButton.addEventListener("click", () => {
  playlistContainer.style.display = "flex";
});

closePlaylistButton.addEventListener("click", () => {
  playlistContainer.style.display = "none";
});

audio.onended = () => {
  position++;
  chooseSong();
};

audio.addEventListener("timeupdate", (e) => {
  const percentage = (e.target.currentTime / e.target.duration) * 100;
  progressBar.style.width = `${percentage}%`;

  const currentMin = Math.floor(e.target.currentTime / 60);
  let currentSec = Math.floor(e.target.currentTime % 60);

  if (currentSec < 10) {
    currentSec = `0${currentSec}`;
  }

  currentTime.textContent = `${currentMin}:${currentSec}`;
});

audio.addEventListener("loadeddata", () => {
  const totalMin = Math.floor(audio.duration / 60);
  let totalSec = Math.floor(audio.duration % 60);

  if (totalSec < 10) {
    totalSec = `0${totalSec}`;
  }

  currentTime.textContent = "0:00";
  totalTime.textContent = `${totalMin}:${totalSec}`;
});

progressBarContainer.addEventListener("click", (e) => {
  const totalWidth = progressBarContainer.offsetWidth;
  const progressWidth = e.offsetX;
  audio.currentTime = (progressWidth / totalWidth) * audio.duration;
});

const chooseSong = () => {
  if (position < 0) {
    position = myPlaylist.length - 1;
  } else if (position > myPlaylist.length - 1) {
    position = 0;
  }
  cover.src = myPlaylist[position].cover;
  song.textContent = myPlaylist[position].song;
  artist.textContent = myPlaylist[position].artist;
  audio.src = myPlaylist[position].audio;
  markPlaylistItem();
};

const changeState = () => {
  progressBar.style.width = 0 + "%";
  if (playButton.style.display === "flex") {
    audio.removeAttribute("autoplay", true);
  } else if (playButton.style.display === "none") {
    audio.setAttribute("autoplay", true);
  }
};

for (let i = 0; i < myPlaylist.length; i++) {
  const playlistItem = document.createElement("li");
  playlistItem.classList.add("playlist-item");
  playlistItem.id = i;

  const playlistItemSong = document.createElement("h4");

  const playlistItemArtist = document.createElement("span");
  playlistItemArtist.classList.add("playlist-item-artist");

  const playlistItemAudio = document.createElement("audio");

  const playlistItemDuration = document.createElement("p");
  playlistItemDuration.classList.add("playlist-item-duration");

  playlist.appendChild(playlistItem);
  playlistItem.appendChild(playlistItemSong);
  playlistItem.appendChild(playlistItemDuration);
  playlistItem.appendChild(playlistItemArtist);

  const myPlaylistItem = myPlaylist[i];
  playlistItemSong.textContent = myPlaylistItem.song;
  playlistItemArtist.textContent = myPlaylistItem.artist;

  playlistItem.style.opacity = "0.8";

  playlistItemAudio.src = myPlaylistItem.audio;

  playlistItem.addEventListener("click", () => {
    playButton.style.display = "none";
    pauseButton.style.display = "flex";

    position = i;
    chooseSong();
    changeState();

    audio.play();
  });

  playlistItemAudio.addEventListener("loadeddata", () => {
    const totalMin = Math.floor(playlistItemAudio.duration / 60);
    let totalSec = Math.floor(playlistItemAudio.duration % 60);

    if (totalSec < 10) {
      totalSec = `0${totalSec}`;
    }

    playlistItemDuration.textContent = `${totalMin}:${totalSec}`;
  });
}

const markPlaylistItem = () => {
  const playlistItem = document.querySelectorAll(".playlist-item");

  for (let i = 0; i < playlistItem.length; i++) {
    if (playlistItem[i].classList.contains("current-position")) {
      playlistItem[i].classList.remove("current-position");
    }

    if (Number(playlistItem[i].id) === position) {
      playlistItem[i].classList.add("current-position");
    }

    playlistItem[i].setAttribute("onclick", "clicked()");
  }
};

const clicked = () => {
  markPlaylistItem();
};
