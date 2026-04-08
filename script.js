const options = [
  { label: "Dinner Date 🍽️", color: "#e91e63" },
  { label: "Movie Night 🎬", color: "#9c27b0" },
  { label: "Pokhara Trip ✈️", color: "#e91e63" },
  { label: "Sunset Walk 🌅", color: "#f06292" },
  { label: "Cook Together 👩‍🍳", color: "#9c27b0" },
  { label: "Cafe Hopping ☕", color: "#e91e63" },
  { label: "Stargazing 🌙", color: "#f06292" },
  { label: "Dance Night 💃", color: "#9c27b0" },
];

const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const totalSlices = options.length;
const sliceAngle = (2 * Math.PI) / totalSlices;
let currentAngle = 0;
let spinning = false;

function drawWheel(rotation) {
  ctx.clearRect(0, 0, 640, 640);
  const cx = 320, cy = 320, r = 310;

  for (let i = 0; i < totalSlices; i++) {
    const start = rotation + i * sliceAngle;
    const end = start + sliceAngle;

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, start, end);
    ctx.closePath();
    ctx.fillStyle = options[i].color;
    ctx.fill();
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(start + sliceAngle / 2);
    ctx.fillStyle = "#fff";
    ctx.font = "bold 22px Georgia";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(options[i].label, r * 0.58, 0);
    ctx.restore();
  }

  ctx.beginPath();
  ctx.arc(cx, cy, 55, 0, 2 * Math.PI);
  ctx.fillStyle = "#fff";
  ctx.fill();
}

function spin() {
  if (spinning) return;
  spinning = true;
  document.getElementById("spinBtn").disabled = true;
  document.getElementById("result").innerHTML = "";

  const extraSpins = 5 + Math.random() * 5;
  const targetAngle = currentAngle + extraSpins * 2 * Math.PI;
  const duration = 4000;
  const startTime = performance.now();
  const startAngle = currentAngle;

  function animate(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    currentAngle = startAngle + (targetAngle - startAngle) * ease;
    drawWheel(currentAngle);

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      spinning = false;
      document.getElementById("spinBtn").disabled = false;
      showResult();
    }
  }

  requestAnimationFrame(animate);
}

function showResult() {
  const normalized = (((-currentAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI));
  const pointerAngle = (Math.PI * 1.5 + normalized) % (2 * Math.PI);
  const index = Math.floor(pointerAngle / sliceAngle) % totalSlices;
  document.getElementById("result").innerHTML =
    `<span>Tonight's plan: ${options[index].label}</span>`;
}

drawWheel(currentAngle);
