const music = document.querySelector('audio');
const prevBtn = document.querySelector("#prev");
const playBtn = document.querySelector("#play");
const nextBtn = document.querySelector("#next");
const image = document.querySelector('img');
const title = document.querySelector('#title');
const artist = document.querySelector('#artist');
const progressContainer = document.querySelector("#progress-container");
const progress = document.querySelector("#progress");
const currentTimeEl = document.querySelector("#current-time");
const durationEl = document.querySelector("#duration");

// music
const songs = [
    {
        name:'jacinto-1',
        displayName:'Electric Chill Machine',
        artist: 'Jacinto'
    },
    {
        name:'jacinto-2',
        displayName:'Electric Machine',
        artist: 'Viking'
    },
    {
        name:'jacinto-3',
        displayName:'Electric Chill ',
        artist: 'Isak'
    },
    {
        name:'metric-1',
        displayName:'Chill Machine',
        artist: 'Shell'
    }
]

// if playing
let isPlaying = false;
let songIndex = 2;

function playSong() {
    isPlaying = true;
    music.play();
    playBtn.classList.replace("fa-circle-play","fa-circle-pause");
    playBtn.setAttribute('title','Pause');
}

function pauseSong() {
    isPlaying = false;
    music.pause();
    playBtn.classList.replace("fa-circle-pause","fa-circle-play");
    playBtn.setAttribute('title','Play');
}

function convertTime(val){
    let mins = Math.floor(val/60);
    let secs = Math.floor(val%60);
    if(secs<10){
        secs=`0${secs}`;
    }
    return `${mins}:${secs}`;
}

function loadSong(song){
    title.textContent = songs[song].displayName;
    artist.textContent = songs[song].artist;
    music.src = `music/${songs[song].name}.mp3`;
    image.src = `img/${songs[song].name}.jpg`;
    currentTimeEl.textContent = '0:00';
    progress.style.width = '0%';
    isPlaying?playSong():pauseSong();
}

function updateProgressBar(e){
    if(isPlaying){
        const {duration,currentTime} = e.srcElement;
        progress.style.width = `${(currentTime/duration)*100}%`;
        currentTimeEl.textContent = convertTime(currentTime);
    }
}

function setProgressBar(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX/width)*music.duration;
    !isPlaying & playSong();
}

function nextSong() {
    songIndex= (songIndex+1)%songs.length;
    loadSong(songIndex);
}

function prevSong() {
    songIndex=(songIndex-1+songs.length)%songs.length;
    loadSong(songIndex);
}

loadSong(songIndex);

playBtn.addEventListener('click',()=>{
    isPlaying?pauseSong():playSong();
})

prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click', nextSong);

music.addEventListener('timeupdate', updateProgressBar);
music.addEventListener('loadedmetadata', ()=> durationEl.textContent = convertTime(music.duration));
music.addEventListener('ended', nextSong);

progressContainer.addEventListener('click', setProgressBar);