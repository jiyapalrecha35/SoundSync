console.log("Welcome to SoundSync!");
//initialize the variables
let index = 0;
let audioElement = new Audio('song/0.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif')
let masterSongName = document.getElementById('masterSongName')
let isUserSeeking = false; // Flag to track user interaction

let song = [
    { songName: "Baatein ye Kabhi Naa", filePath: "song/0.mp3", coverPath: "covers/0.jpg" },
    { songName: "Khamoshiyaan", filePath: "song/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Tera yaar hoon mai", filePath: "song/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "Yaaara teri yaari", filePath: "song/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Kal Ho na Ho", filePath: "song/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Jeena Jeena", filePath: "song/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Illahi", filePath: "song/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "Kabhi Kabhi Aditi", filePath: "song/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "Malang Sajna", filePath: "song/8.mpeg", coverPath: "covers/8.jpg" },   //index 8
    { songName: "Kabira", filePath: "song/9.mpeg", coverPath: "covers/9.jpg" },
    { songName: "Kesariya", filePath: "song/10.mpeg", coverPath: "covers/10.jpg" },
    { songName: "Pasoori", filePath: "song/11.mpeg", coverPath: "covers/11.jpg" },
    { songName: "Phir Aur Kya Chahiye", filePath: "song/12.mpeg", coverPath: "covers/12.jpg" },
    { songName: "Bekhayali", filePath: "song/13.mpeg", coverPath: "covers/13.jpg" },
    { songName: "Tere Hawale", filePath: "song/14.mpeg", coverPath: "covers/14.jpg" },
    { songName: "Pyaar Hota Kayi Baar hai", filePath: "song/15.mpeg", coverPath: "covers/15.jpg" },
    { songName: "Baarishein", filePath: "song/16.mpeg", coverPath: "covers/16.jpg" },
    { songName: "Agar Tum Sath ho", filePath: "song/17.mpeg", coverPath: "covers/17.jpg" },
    { songName: "Ik Vaari aa", filePath: "song/18.mpeg", coverPath: "covers/18.jpg" },
    { songName: "Tera Ghata", filePath: "song/19.mpeg", coverPath: "covers/19.jpg" },
    { songName: "Heeriye", filePath: "song/20.mpeg", coverPath: "covers/20.jpg" },
    { songName: "Phir Aur Kya Chahiye - Female Version", filePath: "song/21.mpeg", coverPath: "covers/21.jpg" },
    { songName: "Bye", filePath: "song/22.mpeg", coverPath: "covers/22.jpg" },
   

];


//listen to events
const updateIndividualPlayButtonState = (index) => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, idx) => {
        if (idx === index) {
            element.classList.remove('fa-circle-play');
            element.classList.add('fa-circle-pause');

        } else {
            element.classList.remove('fa-circle-pause');
            element.classList.add('fa-circle-play');
        }
    });
};
//Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime == 0) {
        //means audio is not playing,so play it,so playing master button
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
        updateIndividualPlayButtonState(index);
    }
    else {
        //pausing master play button
        audioElement.pause();
        masterPlay.classList.add('fa-circle-play');
        masterPlay.classList.remove('fa-circle-pause');
        gif.style.opacity = 0;

        // so pause all individual song play buttons
        const individualPlayButtons = document.getElementsByClassName('songItemPlay');
        Array.from(individualPlayButtons).forEach((element) => {
            element.classList.remove('fa-circle-pause');
            element.classList.add('fa-circle-play');
        });
    }

})

// Update the seekbar only if the user is not currently seeking
audioElement.addEventListener('timeupdate', () => {
    //if user is not updating the seekbar,the audio element is not paused and audio element current time is greater than 0,only then the seekbar will update

    if (!isUserSeeking && !audioElement.paused && audioElement.currentTime > 0) {
        //console.log('Time update');
        let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
        //console.log(progress);
        myProgressBar.value = progress;
    }
});

// Add an event listener to track user seek
myProgressBar.addEventListener('input', () => {
    isUserSeeking = true;
});

// Add an event listener to update the audio time when user stops seeking
myProgressBar.addEventListener('change', () => {
    isUserSeeking = false;
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.add('fa-circle-play');
        element.classList.remove('fa-circle-pause')

    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        //console.log(e.target);
        index = parseInt(e.target.id);
        masterSongName.innerText = song[index].songName;
        console.log(index);

        if (audioElement.paused || audioElement.currentTime == 0) {
            makeAllPlays();
            gif.style.opacity = 1;
            e.target.classList.add('fa-circle-pause');
            e.target.classList.remove('fa-circle-play');
            if (index < 8) {
                audioElement.src = `song/${index}.mp3`;
            }
            else {
                audioElement.src = `song/${index}.mpeg`;
            }
            audioElement.currentTime = 0;
            audioElement.play();
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            updateIndividualPlayButtonState(index);
        }
        else {
            gif.style.opacity = 0;
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            audioElement.pause();
            masterPlay.classList.add('fa-circle-play');
            masterPlay.classList.remove('fa-circle-pause');

        }


    })
})

//handling the previous button
document.getElementById('backward').addEventListener('click', () => {
    if (index == 0) {
        index = song.length-1;
    }
    else {
        index-=1;
    }
    if (index < 8) {
        audioElement.src = `song/${index}.mp3`;
    }
    else {
        audioElement.src = `song/${index}.mpeg`;
    }
    audioElement.currentTime = 0;
    gif.style.opacity = 1;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    masterSongName.innerText = song[index].songName;
    updateIndividualPlayButtonState(index);
})

//handling the next button

document.getElementById('forward').addEventListener('click', () => {
    if (index == song.length-1) {
        index = 0;
    }
    else {
        index+=1;
    }
    if (index < 8) {
        audioElement.src = `song/${index}.mp3`;
    }
    else {
        audioElement.src = `song/${index}.mpeg`;
    }
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    updateIndividualPlayButtonState(index);
    masterSongName.innerText = song[index].songName;
})
audioElement.addEventListener('ended', () => {
    // When the song finishes playing, update individual play button state
    updateIndividualPlayButtonState(-1); // -1 indicates no song is playing
});



// Add an event listener to the 'ended' event of the audio element
audioElement.addEventListener('ended', () => {

    // When the song finishes playing, update individual play button state
    updateIndividualPlayButtonState(-1); // -1 indicates no song is playing

    // Play the next song
    index = (index + 1) % song.length; // Move to the next song circularly
    if (index < 8) {
        audioElement.src = `song/${index}.mp3`;
    } else {
        audioElement.src = `song/${index}.mpeg`;
    }
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    masterSongName.innerText = song[index].songName;
    updateIndividualPlayButtonState(index);
});

