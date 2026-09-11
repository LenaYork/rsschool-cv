const burgerBtn = document.getElementById('burgerBtn');
const drawer = document.getElementById('drawer');
const drawerClose = document.getElementById('drawerClose');
const drawerOverlay = document.getElementById('drawerOverlay');

function openDrawer() {
  drawer.classList.add('open');
  drawerOverlay.classList.add('active');
}

function closeDrawer() {
  drawer.classList.remove('open');
  drawerOverlay.classList.remove('active');
}

burgerBtn.addEventListener('click', openDrawer);
drawerClose.addEventListener('click', closeDrawer);
drawerOverlay.addEventListener('click', closeDrawer);

document.querySelectorAll('.drawer_nav a').forEach(link => {
  link.addEventListener('click', closeDrawer);
});

// theme toggle
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
  document.body.classList.add('dark');
  themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  themeToggle.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// magic cursor
const canvas = document.getElementById('cursorCanvas');
const ctx = canvas.getContext('2d');
const toggleBtn = document.getElementById('cursorToggle');

let particles = [];
let magicOn = localStorage.getItem('magicCursor') !== 'off';

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const techWords = ['JS', 'TS', 'CSS', 'HTML', 'React', 'Node', 'Git', 'REST'];

document.addEventListener('mousemove', (e) => {
  if (!magicOn) return;
  if (Math.random() > 0.3) return;

  const word = techWords[Math.floor(Math.random() * techWords.length)];
  particles.push({
    x: e.clientX + (Math.random() - 0.5) * 30,
    y: e.clientY + (Math.random() - 0.5) * 30,
    text: word,
    life: 50,
    maxLife: 50,
    size: 14 + Math.random() * 8,
    vx: (Math.random() - 0.5) * 0.8,
    vy: -0.6 - Math.random() * 0.5
  });
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles = particles.filter(p => p.life > 0);

  const isDark = document.body.classList.contains('dark');
  const color = isDark ? '102, 179, 255' : '0, 102, 204';

  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    p.life--;
    p.size *= 0.98;

    const alpha = p.life / p.maxLife;
    ctx.font = `600 ${p.size}px 'Outfit', Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = `rgba(${color}, ${alpha * 0.9})`;
    ctx.shadowColor = `rgba(${color}, 0.6)`;
    ctx.shadowBlur = 10;
    ctx.fillText(p.text, p.x, p.y);
  });

  requestAnimationFrame(animate);
}
animate();

const tooltip = document.getElementById('cursorTooltip');

function updateTooltip() {
  tooltip.textContent = magicOn ? 'Disable magic' : 'Enable magic';
}

toggleBtn.addEventListener('click', () => {
  magicOn = !magicOn;
  toggleBtn.classList.toggle('off', !magicOn);
  localStorage.setItem('magicCursor', magicOn ? 'on' : 'off');
  if (!magicOn) particles = [];
  updateTooltip();
});

updateTooltip();
if (!magicOn) toggleBtn.classList.add('off');