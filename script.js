// ====== EDIT THESE ======
const PHOTOS = [
  "photo1.jpg",
  "photo2.jpg",
  "photo3.jpg",
  "photo4.jpg",
  "photo5.jpg",
  "photo6.jpg",
];
const MUSIC_FILE = "flower.mp3";
const COUNT = 10; // how many photos float at the same time
// ========================

const rand = (min, max) => Math.random() * (max - min) + min;

// Stars
const starsBox = document.getElementById("stars");
for (let i = 0; i < 60; i++) {
  const s = document.createElement("span");
  s.className = "star";
  s.style.cssText =
    `left:${rand(0, 100)}%;top:${rand(0, 100)}%;` +
    `--s:${rand(1, 3)}px;--t:${rand(1.5, 4)}s;--d:${rand(0, 3)}s;`;
  starsBox.appendChild(s);
}

// Floating photos
const box = document.getElementById("photos");
for (let i = 0; i < COUNT; i++) {
  const dur = rand(14, 22);
  const card = document.createElement("div");
  card.className = "photo";
  card.style.cssText =
    `--x:${((i + 0.5) / COUNT) * 84 + 8}%;` +      // spread across the screen
    `--size:${rand(26, 36)};` +
    `--dur:${dur}s;--delay:${(i * dur) / COUNT}s;` +
    `--sway:${rand(-8, 8)}vw;` +
    `--ra:${rand(-12, -3)}deg;--rb:${rand(3, 12)}deg;`;

  const frame = document.createElement("div");
  frame.className = "frame";
  const img = document.createElement("img");
  img.src = PHOTOS[i % PHOTOS.length];
  img.alt = "";
  img.style.animationDelay = `${rand(-6, 0)}s`;
  img.onerror = () => { img.remove(); frame.classList.add("missing"); };

  frame.appendChild(img);
  card.appendChild(frame);
  box.appendChild(card);
}

// Music + start screen
const music = new Audio(MUSIC_FILE);
music.loop = true;
music.volume = 0.7;

const startScreen = document.getElementById("start");
const begin = () => {
  document.body.classList.add("playing");
  startScreen.classList.add("hide");
};

// Try real autoplay; if blocked, wait for one tap
music.play().then(begin).catch(() => {});

startScreen.addEventListener("click", () => {
  music.play().catch((err) => console.warn("Music not played:", err));
  begin();
});
