const messages = [
  "🌸 তোমার হাসিটাই আমার প্রিয় গান... 🌸",
  "💖 তুমি আমার জীবনের সবচেয়ে সুন্দর অংশ 💖",
  "🎁 আশা করি এই জন্মদিনে তুমি অনেক খুশি থাকবে 🎁",
  "✨ আনন্দে ভরে উঠুক তোমার প্রতিটি দিন ✨"
];

const button = document.getElementById('surpriseBtn');
const surpriseDiv = document.getElementById('surprise');
const timerEl = document.getElementById('timer');

// Multiple audio
const audioFiles = [
  document.getElementById('voice1'),
  document.getElementById('voice2'),
  document.getElementById('voice3')
];

// Target date (DD-MM-YYYY HH:MM)
const targetDate = new Date("2025-10-11T00:00:00"); // 11-10-2025

// Enable button when target date reached
function checkTimer() {
  const now = new Date();
  const diff = targetDate - now;

  if(diff > 0) {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    timerEl.innerText = `শুধু ${days} দিন ${hours} ঘণ্টা ${minutes} মিনিট ${seconds} সেকেন্ড পর সারপ্রাইজ খুলবে ⏳`;
    button.disabled = true;
  } else {
    timerEl.innerText = "🎉 আজকের দিন! সারপ্রাইজ উপভোগ করো! 🎉";
    button.disabled = false;
  }

  setTimeout(checkTimer, 1000);
}
checkTimer();

// Play multiple audio in sequence
function playMultipleAudio(index = 0) {
  if(index >= audioFiles.length) return; // সব অডিও শেষ
  const audio = audioFiles[index];
  audio.play();
  audio.onended = () => playMultipleAudio(index + 1);
}

// Button click event
button.addEventListener('click', () => {
  surpriseDiv.innerHTML = "";
  showMessageSequence(messages);
  playMultipleAudio();
  startConfetti();
  startStars();
});

// --- Message Typing ---
function showMessageSequence(msgArray) {
  let i = 0;
  function showNext() {
    if(i < msgArray.length) {
      typeMessage(msgArray[i], 0, () => {
        i++;
        setTimeout(showNext, 1000);
      });
    }
  }
  showNext();
}

function typeMessage(msg, index, callback) {
  if(index < msg.length) {
    surpriseDiv.innerHTML += msg[index];
    setTimeout(() => typeMessage(msg, index + 1, callback), 50);
  } else {
    surpriseDiv.innerHTML += "<br>";
    if(callback) callback();
  }
}

// --- Confetti Effect ---
function startConfetti() {
  const canvas = document.getElementById('confetti');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const confettiCount = 120;
  const confetti = [];

  for(let i=0; i<confettiCount; i++){
    confetti.push({
      x: Math.random()*canvas.width,
      y: Math.random()*canvas.height - canvas.height,
      r: Math.random()*6+4,
      d: Math.random()*confettiCount,
      color: `hsl(${Math.random()*360},100%,50%)`,
      tilt: Math.random()*10-10,
      tiltAngleIncrement: Math.random()*0.07+0.05
    });
  }

  function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    confetti.forEach((c,i)=>{
      ctx.beginPath();
      ctx.lineWidth = c.r;
      ctx.strokeStyle = c.color;
      ctx.moveTo(c.x + c.tilt + c.r/2, c.y);
      ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r/2);
      ctx.stroke();

      c.tilt += c.tiltAngleIncrement;
      c.y += (Math.cos(0.01 + c.d) + 3 + c.r/2)/2;

      if(c.y > canvas.height){
        confetti[i] = {
          x: Math.random()*canvas.width,
          y: -10,
          r: c.r,
          d: c.d,
          color: c.color,
          tilt: c.tilt,
          tiltAngleIncrement: c.tiltAngleIncrement
        };
      }
    });

    requestAnimationFrame(draw);
  }
  draw();
}

// --- Stars Effect ---
function startStars() {
  const canvas = document.getElementById('stars');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const stars = [];
  const starCount = 50;
  for(let i=0;i<starCount;i++){
    stars.push({
      x: Math.random()*canvas.width,
      y: Math.random()*canvas.height,
      r: Math.random()*2+1,
      alpha: Math.random()
    });
  }

  function drawStars(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    stars.forEach(star=>{
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(255,255,255,${star.alpha})`;
      ctx.fill();

      star.alpha += (Math.random()*0.02-0.01);
      if(star.alpha < 0) star.alpha = 0;
      if(star.alpha > 1) star.alpha = 1;
    });
    requestAnimationFrame(drawStars);
  }
  drawStars();
}
