const themeButton = document.getElementById('theme-toggle');
const canvas = document.getElementById('background-canvas');
const context = canvas.getContext('2d');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let dots = [];
let animationId;

function setTheme(isDark) {
  document.body.classList.toggle('dark', isDark);
  themeButton.textContent = isDark ? 'Light mode' : 'Dark mode';
}

themeButton.addEventListener('click', function () {
  setTheme(!document.body.classList.contains('dark'));
});

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const dotCount = Math.min(70, Math.floor(canvas.width / 18));
  dots = [];

  for (let i = 0; i < dotCount; i++) {
    dots.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 1,
      speedX: Math.random() * 0.4 - 0.2,
      speedY: Math.random() * 0.4 - 0.2
    });
  }
}

function drawCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  const darkMode = document.body.classList.contains('dark');
  context.fillStyle = darkMode ? 'rgba(143, 207, 159, 0.35)' : 'rgba(45, 125, 143, 0.22)';
  context.strokeStyle = darkMode ? 'rgba(184, 223, 193, 0.12)' : 'rgba(31, 95, 110, 0.1)';

  dots.forEach(function (dot, index) {
    dot.x += dot.speedX;
    dot.y += dot.speedY;

    if (dot.x < 0 || dot.x > canvas.width) {
      dot.speedX *= -1;
    }

    if (dot.y < 0 || dot.y > canvas.height) {
      dot.speedY *= -1;
    }

    context.beginPath();
    context.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
    context.fill();

    for (let i = index + 1; i < dots.length; i++) {
      const otherDot = dots[i];
      const distance = Math.hypot(dot.x - otherDot.x, dot.y - otherDot.y);

      if (distance < 120) {
        context.globalAlpha = 1 - distance / 120;
        context.beginPath();
        context.moveTo(dot.x, dot.y);
        context.lineTo(otherDot.x, otherDot.y);
        context.stroke();
        context.globalAlpha = 1;
      }
    }
  });

  animationId = requestAnimationFrame(drawCanvas);
}

function startCanvas() {
  cancelAnimationFrame(animationId);
  resizeCanvas();

  if (!reduceMotion.matches) {
    drawCanvas();
  }
}

window.addEventListener('resize', resizeCanvas);
reduceMotion.addEventListener('change', startCanvas);
startCanvas();
