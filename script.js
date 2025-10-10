const messages = [
  "🌸 তোমার হাসিটাই আমার প্রিয় গান... 🌸"
];

const button = document.getElementById('surpriseBtn');
const surpriseDiv = document.getElementById('surprise');
const timerEl = document.getElementById('timer');
const voiceButtons = document.getElementById('voiceButtons');
const notesDiv = document.getElementById('notesDiv');

const voice1 = document.getElementById('voice1');
const voice2 = document.getElementById('voice2');
const voice3 = document.getElementById('voice3');

// Timer now set to 10-10-2025 10:50 PM
const targetDate = new Date("2025-10-10T22:50:00");

// Check localStorage flag
if(localStorage.getItem('birthdayUnlocked') === 'true'){
  enableSurprise();
}

// Timer
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
    localStorage.setItem('birthdayUnlocked', 'true');
    enableSurprise();
  }

  setTimeout(checkTimer, 1000);
}
checkTimer();

function enableSurprise() {
  timerEl.innerText = "🎉 আজকের দিন! সারপ্রাইজ উপভোগ করো! 🎉";
  button.disabled = false;
  voiceButtons.style.display = "flex";
  notesDiv.style.display = "flex";
}

// Surprise click
button.addEventListener('click', () => {
  surpriseDiv.innerHTML = "";
  showMessageSequence(messages);
  voice1.play();
  startConfetti();
  startStars();
});

// Voice Notes buttons
document.getElementById('playVoice2').addEventListener('click', () => voice2.play());
document.getElementById('playVoice3').addEventListener('click', () => voice3.play());

// Message typing
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

// Confetti
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

// Stars
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
