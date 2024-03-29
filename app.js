
const app = () => {
  const song = document.querySelector(".song");
  const play = document.querySelector(".play");
  const replay = document.querySelector(".replay");
  const outline = document.querySelector(".moving-outline circle");
  const video = document.querySelector(".vid-container video");
  //Sounds
  const sounds = document.querySelectorAll(".sound-picker button");
  //Time Display
  const timeDisplay = document.querySelector(".time-display");
  const outlineLength = outline.getTotalLength();
  //Duration
  const timeSelect = document.querySelectorAll(".time-select button");
  let fakeDuration = 600;
  
  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset =outline;
  //play different sound 
  sounds.forEach(sound =>{
    sound.addEventListener('click', function(){
      song.src= this.getAttribute('data-sound');
      video.src = this.getAttribute('data-video');
      checkPlaying(song);
    })
  });
  // play sound  
  play.addEventListener('click',()=>{
    checkPlaying(song);
  });

  timeSelect.forEach(option => {
    option.addEventListener('click', function (){
      fakeDuration = this.getAttribute("data-time");
      timeDisplay.textContent = `${Math.floor(fakeDuration/60)}:
      ${Math.floor(fakeDuration%60)}`;
    });
  });

  // stop plaing sound 

  const checkPlaying = song =>{
    if(song.paused){
      song.play();
      video.play();
      play.src = "./svg/pause.svg";
    }else{
      song.pause();
      play.src = "./svg/play.svg";
      video.pause();
    }
  };
  song.ontimeupdate = () =>
  {
    let currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime; 
    let second = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60 );

    let progress = outlineLength - (currentTime/ fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress ; 
    timeDisplay.textContent = `${minutes}:${second}`;
    
    if(currentTime>=fakeDuration){
      song.pause();
      song.currentTime = 0; 
      play.src = "./svg/play.svg";
      video.pause();
    }
  };
};

app();