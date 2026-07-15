const themeButton = document.getElementById('theme-toggle');
const canvas = document.getElementById('background-canvas');
const context = canvas.getContext('2d');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let dots = [];
let animationId;

// Toggle only the body class; CSS variables handle the actual color changes.
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

  // Most dots start near an edge so the center remains readable.
  const dotCount = Math.min(105, Math.floor(canvas.width / 13));
  dots = [];

  for (let i = 0; i < dotCount; i++) {
    const edgeBias = Math.random() < 0.78;
    const x = edgeBias ? getEdgePosition(canvas.width) : Math.random() * canvas.width;
    const y = edgeBias ? getEdgePosition(canvas.height) : Math.random() * canvas.height;

    dots.push({
      x: x,
      y: y,
      size: Math.random() * 3.2 + 1.6,
      speedX: Math.random() * 0.32 - 0.16,
      speedY: Math.random() * 0.32 - 0.16
    });
  }
}

// Bias a coordinate toward either side of the screen.
function getEdgePosition(length) {
  const fromStart = Math.random() < 0.5;
  const edgeDepth = Math.pow(Math.random(), 1.65) * length * 0.46;
  return fromStart ? edgeDepth : length - edgeDepth;
}

// Dots and lines fade near the center so the animation frames the content instead of covering it.
function getCornerVisibility(dot) {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const distanceFromCenter = Math.hypot(dot.x - centerX, dot.y - centerY);
  const maxDistance = Math.hypot(centerX, centerY);
  const distanceRatio = distanceFromCenter / maxDistance;

  return Math.max(0.06, Math.min(1, Math.pow(distanceRatio, 1.75)));
}

function drawCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  const darkMode = document.body.classList.contains('dark');
  context.fillStyle = darkMode ? 'rgba(143, 207, 159, 0.56)' : 'rgba(45, 125, 143, 0.42)';
  context.strokeStyle = darkMode ? 'rgba(184, 223, 193, 0.26)' : 'rgba(31, 95, 110, 0.23)';
  context.lineWidth = 1.35;
  context.shadowBlur = darkMode ? 9 : 7;
  context.shadowColor = darkMode ? 'rgba(143, 207, 159, 0.36)' : 'rgba(45, 125, 143, 0.28)';

  dots.forEach(function (dot, index) {
    dot.x += dot.speedX;
    dot.y += dot.speedY;

    if (dot.x < 0 || dot.x > canvas.width) {
      dot.speedX *= -1;
    }

    if (dot.y < 0 || dot.y > canvas.height) {
      dot.speedY *= -1;
    }

    const dotVisibility = getCornerVisibility(dot);
    context.globalAlpha = dotVisibility;
    context.beginPath();
    context.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
    context.fill();
    context.globalAlpha = 1;

    for (let i = index + 1; i < dots.length; i++) {
      const otherDot = dots[i];
      const distance = Math.hypot(dot.x - otherDot.x, dot.y - otherDot.y);

      if (distance < 155) {
        const lineVisibility = Math.min(dotVisibility, getCornerVisibility(otherDot));
        context.globalAlpha = (1 - distance / 155) * lineVisibility;
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

  // If reduced motion is requested, draw the static gradient only and skip animation.
  if (!reduceMotion.matches) {
    drawCanvas();
  }
}

window.addEventListener('resize', resizeCanvas);
reduceMotion.addEventListener('change', startCanvas);
startCanvas();
