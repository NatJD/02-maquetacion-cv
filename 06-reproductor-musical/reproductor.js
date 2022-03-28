let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');


let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
    {
        img : 'album/plasticbeach.jpg',
        name : 'Plastic Beach',
        artist : 'Plastic Beach, Gorillaz',
        music : 'audio/Plastic Beach.mp3'
    },
    {
        img : 'album/plasticbeach.jpg',
        name : 'On Melancholy Hill',
        artist : 'Plastic Beach, Gorillaz',
        music : 'audio/On-Melancholy-Hill.mp3'
    },
    {
        img : 'album/voulez-vous.jpg',
        name : 'Chiquitita',
        artist : 'Voules-Vous, ABBA',
        music : 'audio/Chiquitita.mp3'
    },
    {
        img : 'album/Arrival1.jpg',
        name : 'Dancing Queen',
        artist : 'Arrival, ABBA',
        music : 'audio/DancingQueen.mp3'
    }, 
    {
        img : 'album/Sour1.jpg',
        name : 'Happier',
        artist : 'Sour, Olivia Rodrigo',
        music : 'audio/Happier.mp3'
    },
    {
        img : 'album/Sour1.jpg',
        name : 'Favorite Crime',
        artist : 'Sour, Olivia Rodrigo',
        music : 'audio/FavoriteCrime.mp3'
    },
    {
        img : 'album/Proaño.jpg',
        name : 'Rosa Náutica',
        artist : 'ProAño, Enjambre',
        music : 'audio/RosaNáutica.mp3'
    },
    {
        img : 'album/Daltónico.jpg',
        name : 'Cobarde',
        artist : 'Daltónico, Enjambre',
        music : 'audio/Cobarde.mp3'
    },
    {
        img : 'album/TheDarkSideoftheMoon.jpg',
        name : 'The Great Gig in the Sky',
        artist : 'The Dark Side of the Moon, Pink Floyd',
        music : 'audio/TheGreat.mp3'
    },
    {
        img : 'album/WishYouWereHere.jpg',
        name : 'Shine On You Crazy Diamond',
        artist : 'Wish You Were Here, Pink Floyd',
        music : 'audio/Shine.mp3'
    },
    {
        img : 'album/Wannabewithu.jpg',
        name : 'Amor de Siempre',
        artist : 'Wannabewithu, Cuco',
        music : 'audio/Amor de Siempre.mp3'
    },
    {
        img : 'album/cuco.jpg',
        name : 'We Had to End It',
        artist : 'Songs4u, Cuco',
        music : 'audio/cuco-we-had.mp3'
    },
    {
        img : 'album/BetheCowboy.jpg',
        name : 'Washing Machine Heart',
        artist : 'Be the Cowboy, Mitski',
        music : 'audio/Washing Machine Heart.mp3'
    },
    {
        img : 'album/BetheCowboy.jpg',
        name : 'Nobody',
        artist : 'Be the Cowboy, Mitski',
        music : 'audio/Nobody.mp3'  
    },
    {
        img : 'album/KissOrDeath.jpeg',
        name : 'Kiss or Death',
        artist : 'Kiss or Death, Monsta X',
        music : 'audio/Kiss-or-Death.mp3'
    },
{

    img : 'album/TheDreaming.jpg',
    name : 'You Problem',
    artist : 'The Dreaming, Monsta X',
    music : 'audio/You Problem.mp3'
},
{

    img : 'album/rosenrot.jpg',
    name : 'Spring',
    artist : 'Rosenrot, Rammstein',
    music : 'audio/spring.mp3'
},
{

    img : 'album/sehnsucht.jpg',
    name : 'Engel',
    artist : 'Sehnsucht, Rammstein',
    music : 'audio/engel.mp3'
},
{
    img : 'album/PocketPark.jpg',
    name : 'Stay With Me',
    artist : 'Pocket Park, Miki Matsubara',
    music : 'audio/Stay With Me.mp3'
},
{
    img : 'album/plasticlove.jpg',
    name : 'Plastic Love',
    artist : 'Plastic Love, Mariya Takeuchi',
    music : 'audio/plasticlove.mp3'
},
];

loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_list.length;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
    random_bg_color();
}


function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}
function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}
function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}
function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    wave.classList.add('loader');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    wave.classList.remove('loader');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}