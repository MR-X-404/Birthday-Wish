function showSurprise() {
  const surprise = document.getElementById('surprise');
  surprise.classList.remove('hidden');
  surprise.classList.add('fade-in');

  const audio = document.getElementById('voice');
  audio.play();

  startConfetti();
}

/* --- Confetti Effect --- */
function startConfetti() {
  const canvas = document.getElementById('confetti');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const confettiCount = 150;
  const confetti = [];

  for(let i = 0; i < confettiCount; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * confettiCount,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      tilt: Math.random() * 10 - 10,
      tiltAngleIncrement: Math.random() * 0.07 + 0.05
    });
  }

  let tiltAngle = 0;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach((c, i) => {
      ctx.beginPath();
      ctx.lineWidth = c.r;
      ctx.strokeStyle = c.color;
      ctx.moveTo(c.x + c.tilt + c.r / 2, c.y);
      ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r / 2);
      ctx.stroke();

      c.tilt += c.tiltAngleIncrement;
      c.y += (Math.cos(0.01 + c.d) + 3 + c.r/2) / 2;

      if(c.y > canvas.height) {
        confetti[i] = { 
          x: Math.random() * canvas.width,
          y: -10,
          r: c.r,
          d: c.d,
          color: c.color,
          tilt: c.tilt,
          tiltAngleIncrement: c.tiltAngleIncrement
        };
      }
    });

    tiltAngle += 0.01;
    requestAnimationFrame(draw);
  }

  draw();
}
