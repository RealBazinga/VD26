// ---------------- VARIABLES ----------------
let messageIndex = 0;
let lastMoveTime = 0;
let noSpeed = 1; // adjust movement speed/farther = faster

const messages = [
  "Are you sure? 🥺",
  "Like… really sure??",
  "Even my imaginary teddy is upset 🧸💔",
  "This is not very rom-com of you!",
  "Plot twist: you're supposed to say yes 😏",
  "The Yes button is looking kinda good now 👀",
  "Okay but I'm telling the love gods 😤"
];

const noButton = document.querySelector(".no-button");
const yesButton = document.querySelector(".yes-button");

// ---------------- NO BUTTON ----------------
function handleNoClick(e) {
  // Update message
  noButton.textContent = messages[messageIndex];
  messageIndex = (messageIndex + 1) % messages.length;

  // Grow Yes button slightly
  const currentSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
  yesButton.style.fontSize = `${currentSize * 1.4}px`;

  // Force No button to run away after click
  moveButtonAway(e, true);
}

function moveButtonAway(e, forced = false) {
  const now = Date.now();

  if (!forced && now - lastMoveTime < 1200) return;

  const btnRect = noButton.getBoundingClientRect();
  const centerX = btnRect.left + btnRect.width / 2;
  const centerY = btnRect.top + btnRect.height / 2;

  const distance = e ? Math.hypot(e.clientX - centerX, e.clientY - centerY) : 0;

  if (!forced && distance > 80) return;

  lastMoveTime = now;

  const padding = 60;
  const maxX = window.innerWidth - btnRect.width - padding;
  const maxY = window.innerHeight - btnRect.height - padding;

  const randomX = (Math.random() * maxX * 0.7) * noSpeed;
  const randomY = (Math.random() * maxY * 0.7) * noSpeed;

  noButton.style.position = "fixed";
  noButton.style.left = Math.min(randomX, maxX) + "px";
  noButton.style.top = Math.min(randomY, maxY) + "px";
}

// ---------------- YES BUTTON ----------------
yesButton.addEventListener("click", () => {
  createHeartExplosion();
  setTimeout(() => window.location.href = "yes_page.html", 900);
});

// ---------------- HEART EXPLOSION ----------------
function createHeartExplosion() {
  for (let i = 0; i < 35; i++) {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.textContent = "💖";

    const x = (Math.random() - 0.5) * 600 + "px";
    const y = (Math.random() - 0.5) * 600 + "px";

    heart.style.setProperty("--x", x);
    heart.style.setProperty("--y", y);

    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1000);
  }
}

// ---------------- EVENT LISTENERS ----------------
noButton.addEventListener("click", handleNoClick);
document.addEventListener("mousemove", moveButtonAway);
