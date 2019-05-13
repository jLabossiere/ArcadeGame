const audio = new Audio('../audio/Meydn_-_Fae.mp3');
const musicButton = document.querySelector('.play-music');

musicButton.addEventListener('click', () => audio.play());
